"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Area {
    constructor(name, desc, items = [], hazard) {
        this.name = name;
        this.desc = desc;
        this.items = items;
        this.hazard = hazard;
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        let str = this.desc;
        this.items.forEach(item => {
            str += " " + item.getDescription();
        });
        return str;
    }
    getItem(item) {
        let toGet = this.items.filter(obj => obj.getName() === item);
        if (toGet.length > 0) {
            return toGet[0];
        }
        return undefined;
    }
    setItem(item) {
        this.items.push(item);
    }
    hasHazards() {
        return this.hazard != undefined;
    }
    disableHazard() {
        let str = "";
        if (this.hazard != null) {
            this.hazard.setCleared();
            str += this.hazard.deactivated();
            str += ' ' + this.availableDirections();
        }
        return str;
    }
    getHazard() {
        if (this.hazard != null) {
            return this.hazard;
        }
        else {
            return null;
        }
    }
    passable() {
        let bool = true;
        if (this.hazard != undefined && !this.hazard.isCleared()) {
            bool = false;
        }
        return bool;
    }
    hazardMsg() {
        let msg = "";
        if (this.hazard != undefined) {
            if (this.passable()) {
                msg = this.hazard.deactivated();
            }
            else {
                msg = this.hazard.activated();
            }
        }
        return msg;
    }
    availableDirections() {
        let dir = [];
        if (this.north != null) {
            dir.push('north');
        }
        if (this.south != null) {
            dir.push('south');
        }
        if (this.east != null) {
            dir.push('east');
        }
        if (this.west != null) {
            dir.push('west');
        }
        return "There are doors to the " + dir.join(', ') + ".";
    }
    getLocationOf(direction) {
        if (direction == "NORTH") {
            if (this.north == undefined) {
                console.log("It's a dead end! Choose another direction.");
            }
            else if (this.hazard != undefined && !this.passable()) {
                console.log(this.hazardMsg());
            }
            else {
                return this.north;
            }
        }
        else if (direction == "SOUTH") {
            if (this.south == undefined) {
                console.log("It's a dead end! Choose another direction.");
            }
            else if (this.hazard != undefined && !this.passable()) {
                console.log(this.hazardMsg());
            }
            else {
                return this.south;
            }
        }
        else if (direction == "EAST") {
            if (this.east == undefined) {
                console.log("It's a dead end! Choose another direction.");
            }
            else if (this.hazard != undefined && !this.passable()) {
                console.log(this.hazardMsg());
            }
            else {
                return this.east;
            }
        }
        else if (direction == "WEST") {
            if (this.west == undefined) {
                console.log("It's a dead end! Choose another direction.");
            }
            else if (this.hazard != undefined && !this.passable()) {
                console.log(this.hazardMsg());
            }
            else {
                return this.west;
            }
        }
        else {
            console.log("You can't go in this direction!");
        }
        return null;
    }
    setArea(direction, area) {
        if (direction === "NORTH") {
            this.north = area;
        }
        else if (direction === "SOUTH") {
            this.south = area;
        }
        else if (direction === "EAST") {
            this.east = area;
        }
        else if (direction === "WEST") {
            this.west = area;
        }
    }
}
exports.default = Area;
//# sourceMappingURL=Area.js.map