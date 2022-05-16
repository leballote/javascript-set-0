class Floor {
    constructor(rooms) {
        if (rooms == null) rooms = [];
        this.rooms = rooms;
    }

    addRoom(room) {
        this.rooms.push(room);
    }
}

class Room {
    constructor(users, equipment) {
        if (users == null) users = []; 
        if (equipment == null) equipment = [];
        this.users = users;
        this.equipment = equipment;
    }

    addUser(user) {
        this.users.push(user);
    }

    addEq(eq) {
        this.equipment.push(eq);
    }
}

class User {
    constructor(id) {
        this.id = id;
    }
}

class Equipment {
    constructor(id, user) {
        this.id = id;
        this.user = user;
    }
}

class Building {
    constructor(floors) {
        if (floors == null) floors = [];
        this.floors = floors;
    }

    getFloors() {
        return this.floors;
    }

    getRooms() {
        return this.getFloors.reduce((floor1, floor2) => {
            return floor1.rooms.concat(floor2.rooms); 
        }, []);
    }

    getUsers() {
        return this.getRooms.reduce((room1, room2) => {
            return room1.users.concat(room2.users); 
        }, []);
    }

    getEquipment() {
        return this.getRooms();
    }

    showStructure(verbose=true) {
        const floors = this.getFloors(); 
        for (let i = 0; i < floors.length; i++) {
            console.log(`Floor ${i}:`);
            const floor = floors[i];
            const rooms = floor.rooms;
            for (let j = 0; j < rooms.length; j++) {
                console.log(`    Room ${j}: `);
                const room = rooms[j];
                const users = room.users;
                const equipment = room.equipment;
                console.log(`        Users:`);
                console.log();
                if (verbose) {
                    for (const user of users) {
                        console.log(`        User ${user.id}`);
                    }
                }
                console.log();
                console.log(`        Equipment:`);
                console.log();
                if (verbose) {
                    for (const eq of equipment) {
                        console.log(`        Eq ${eq.id} {"user": ${eq.user.id}}`);
                    }
                }
                console.log();
            }
        }
    }
}

class TechSupport {
    constructor(building) {
        this.building = building;
        this.userLocations = {};
        this.equipmentLocations = {};
        this.lastSearchedFloorUser = 0;
        this.lastSearchedRoomUser = 0;
        this.lastSearchedFloorEq = 0;
        this.lastSearchedRoomEq = 0;
    };

    findUser(userToFind, memo=true) {
        if (typeof userToFind != "number") userToFind = userToFind.id;
        if (memo && userToFind in this.userLocations) return this.userLocations[userToFind]; 

        let floorIdx = memo ? this.lastSearchedFloorUser : 0; 
        let roomIdx = memo ? this.lastSearchedRoomUser : 0;

        let floor = this.building.floors[floorIdx];

        //finish the memoized search for the last searched floor
        for (let j = roomIdx + 1; j < floor.rooms.length; j++) {
            const room = floor.rooms[j];
            for (const user of room.users) {
                this.userLocations[user.id] = [floorIdx, j];
                if (user.id === userToFind) {
                    return [floorIdx, j]; 
                }
            }
        }

        //continue normally with the following floors
        for (let i = floorIdx + 1; i < building.floors.length; i++) {
            const floor = building.floors[i]; 
            for (let j = 0; j < floor.rooms.length; j++) {
                const room = floor.rooms[j]; 
                for (const user of room.users) {
                    this.userLocations[user.id] = [i, j];
                    if (userToFind === user.id) {
                        return [i, j];
                    }
                } 
            }
        }
    }

    findEquipment(eqToFind, memo=true) {
        if (typeof eqToFind != "number") eqToFind = eqToFind.id;
        if (memo && eqToFind in this.equipmentLocations) return this.equipmentLocations[eqToFind]; 

        let floorIdx = memo ? this.lastSearchedFloorEq : 0; 
        let roomIdx = memo ? this.lastSearchedRoomEq : 0;

        let floor = this.building.floors[floorIdx];

        //finish the memoized search for the last searched floor
        for (let j = roomIdx + 1; j < floor.rooms.length; j++) {
            const room = floor.rooms[j];
            for (const eq of room.equipment) {
                this.equipmentLocations[eq.id] = [floorIdx, j];
                if (eq.id === eqToFind) {
                    return [floorIdx, j]; 
                }
            }
        }

        //continue normally with the following floors
        for (let i = floorIdx + 1; i < building.floors.length; i++) {
            const floor = building.floors[i]; 
            for (let j = 0; j < floor.rooms.length; j++) {
                const room = floor.rooms[j]; 
                for (const eq of room.equipment) {
                    this.equipmentLocations[eq.id] = [i, j];
                    if (eqToFind === eq.id) {
                        return [i, j];
                    }
                } 
            }
        }
    }
}

function randomInitializeBuilding(noFloors, noRooms, noUsers, noEqipment) {
    let currentUserId = 0;
    let currentEqId = 0;
    const users = [];
    const building = new Building();
    for (let i = 0; i < noFloors; i++) {
        building.floors.push(new Floor());
    }
    for (let i = 0; i < noRooms; i++) {
        const floor = chooseRandomlyFromArray(building.floors);
        floor.addRoom(new Room());
    }
    for (let i = 0; i < noUsers; i++) {
        const floor = chooseRandomlyFromArray(building.floors);
        const room = chooseRandomlyFromArray(floor.rooms);
        const user = new User(currentUserId++);
        room.addUser(user);
        users.push(user);
    }
    for (let i = 0; i < noEqipment; i++) {
        const floor = chooseRandomlyFromArray(building.floors);
        const room = chooseRandomlyFromArray(floor.rooms);
        const user = chooseRandomlyFromArray(users); 
        room.addEq(new Equipment(currentEqId++, user));
    }
    return building;
}

function chooseRandomlyFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}


const building = randomInitializeBuilding(5, 20, 100, 80);
// building.showStructure(); // to show the exact building structure


const tech = new TechSupport(building);

const eq = building.floors[3].rooms[0].users[0];

console.log("user to find: ", eq);  
console.log(tech.findUser(eq)); // 3, 0

for (i = 80; i >= 50; i--) {
    console.log(tech.findUser(i));
}

for (i = 30; i >= 5; i--) {
    console.log(tech.findEquipment(i));
}

// console.log(tech.userLocations); // the memoized users
// console.log(tech.equipmentLocations); // the memoized equipment