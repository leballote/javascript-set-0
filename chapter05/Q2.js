class Floor {
    constructor(rooms, id) {
        this.rooms = rooms;
    }
}

class Room {
    constructor(users, equipment, id) {
        this.users = users;
        this.equipment = equipment;
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
}

class TechSupport {
    constructor(building) {
        this.building = building;
        this.userLocations = {};
        this.equipmentLocations = {};
    };

    findUser(userToFind) {
        if (userToFind in this.userLocation) return this.userLocations[userToFind.id]; 
        const building = this.building; 

        for (let i = 0; i < building.floors.length; i++) {
            let floor = building.floors[i]; 
            for (let j = 0; j < floor.rooms.lenght; j++) {
                let room = floor.rooms[j]; 
                for (let user of room.users) {
                    if (userToFind.id = user.id) {
                        this.userLocations[userToFind.id] = [i, j];
                    }
                } 
            }
        }
    }

    findEquipment(piceEqToFind) {
        if (piceEqToFind in this.userLocation) return this.userLocations[piceEqToFind.id]; 
        const building = this.building; 

        for (let i = 0; i < building.floors.length; i++) {
            let floor = building.floors[i]; 
            for (let j = 0; j < floor.rooms.lenght; j++) {
                let room = floor.rooms[j]; 
                for (let piceEq of room.equipment) {
                    if (piceEqToFind.id = piceEq.id) {
                        this.userLocations[piceEqToFind.id] = [i, j];
                    }
                } 
            }
        }
    }
}