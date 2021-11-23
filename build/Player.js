"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(location) {
        this.inventory = [];
        this.used = [];
        this.currentLocation = location;
    }
    pickupItem(item) {
        let areaItem = this.currentLocation.getItem(item);
        if (areaItem != undefined) {
            if (this.inventory.includes(areaItem) || this.used.includes(areaItem)) {
                console.log("You can't pick this up again!");
            }
            else {
                let msg = "The " + item + " has been added to your inventory.";
                this.inventory.push(areaItem);
                console.log(msg);
            }
        }
        else {
            console.log("That item doesn't exist here!");
        }
    }
    useItem(item) {
        let obj = this.inventory.filter(thing => thing.getName() == item);
        if (obj.length > 0) {
            this.inventory = this.inventory.filter(thing => thing != obj[0]);
            this.used.push(obj[0]);
            console.log(obj[0].use());
        }
        else {
            console.log("You don't have this item!");
        }
    }
    printInventory() {
        let res = "";
        if (this.inventory.length > 0 || this.used.length > 0) {
            let inv = [];
            let usedI = [];
            this.inventory.forEach(item => {
                inv.push(item.getName());
            });
            this.used.forEach(item => {
                usedI.push(item.getName());
            });
            res += "Inventory: " + inv.join(', ');
            res += "\n";
            res += "Used Items (you can no longer use these): " + usedI.join(', ');
        }
        else {
            res = "You haven't picked anything up yet!";
        }
        console.log(res);
    }
    inventoryContains(item) {
        let obj = this.inventory.filter(thing => thing.getName() == item);
        let usedObj = this.used.filter(thing => thing.getName() == item);
        if (obj.length > 0 || usedObj.length > 0) {
            return true;
        }
        return false;
    }
    setLocation(dir) {
        let newLoc = this.currentLocation.getLocationOf(dir);
        if (newLoc != null && this.currentLocation.passable()) {
            this.currentLocation = newLoc;
            this.printLocDetails();
        }
        return newLoc;
    }
    printLocDetails() {
        console.log('\n' + this.currentLocation.getName() + '\n');
        if (this.currentLocation.hasHazards() && !this.currentLocation.passable()) {
            console.log(this.currentLocation.getDescription() + ' ' + this.currentLocation.hazardMsg());
        }
        else {
            console.log(this.currentLocation.getDescription() + ' ' + this.currentLocation.availableDirections());
        }
    }
    getLocation() {
        return this.currentLocation;
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map