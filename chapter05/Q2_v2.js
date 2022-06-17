// I didn't see the problem with the searches mentioned. The memoization is not only done for the user searched, but for all the users seen during the search, so there should be no point to start the search from zero. Though, I made another version on file Q2_v2.js
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
    };

    findUser(userToFind, memo=true) {
        if (typeof userToFind != "number") userToFind = userToFind.id;
        if (memo && userToFind in this.userLocations) return this.userLocations[userToFind]; 

        for (let i = 0; i < building.floors.length; i++) {
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
        return [-1, -1];
    }

    findEquipment(eqToFindId, memo=true) {
        if (typeof eqToFindId != "number") eqToFindId = eqToFindId.id;
        if (memo && eqToFindId in this.equipmentLocations) return this.equipmentLocations[eqToFindId]; 

        //continue normally with the following floors
        for (let i = 0; i < building.floors.length; i++) {
            const floor = building.floors[i]; 
            for (let j = 0; j < floor.rooms.length; j++) {
                const room = floor.rooms[j]; 
                for (const eq of room.equipment) {
                    this.equipmentLocations[eq.id] = [i, j];
                    if (eqToFindId === eq.id) {
                        return [i, j];
                    }
                } 
            }
        }
        return [-1, -1];
    }
}

function randomInitializeBuilding(noFloors, noRooms, noUsers, noEquipment) {
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
        const floor = chooseRandomlyFromArray(building.floors.filter(floor => floor.rooms.length > 0));
        const room = chooseRandomlyFromArray(floor.rooms);
        const user = new User(currentUserId++);
        room.addUser(user);
        users.push(user);
    }
    for (let i = 0; i < noEquipment; i++) {
        const floor = chooseRandomlyFromArray(building.floors.filter(floor => floor.rooms.length > 0));
        const room = chooseRandomlyFromArray(floor.rooms);
        const user = chooseRandomlyFromArray(users); 
        room.addEq(new Equipment(currentEqId++, user));
    }
    return building;
}

function chooseRandomlyFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}


//tests
const building = randomInitializeBuilding(5, 20, 100, 80);
// building.showStructure(); // to show the exact building structure


const tech = new TechSupport(building);

const eq = building.floors[3].rooms[0].users[0];

// console.log("user to find: ", eq);  
// console.log(tech.findUser(eq)); // 3, 0


for (i = 80; i >= 50; i--) {
    let [floor, room] = tech.findUser(i, false); 
    if (floor === -1) console.log("WARNING: SOMETHING IS WRONG");
    console.log("user id: ", i, "floor, room: ", floor, room);
}


for (i = 30; i >= 6; i--) {
    let [floor, room] = tech.findEquipment(i, false); 
    if (floor === -1) console.log("WARNING: SOMETHING IS WRONG");
    console.log("eq id: ", i, "floor, room: ", floor, room);
}

// console.log(tech.lastSearchedFloorUser);
// console.log(tech.equipmentLocations); // the memoized equipment
// console.log(tech);
// console.log(tech.userLocations); // the memoized users