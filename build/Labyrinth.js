"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Labyrinth {
    constructor(goalItem, goalLoc, monster, monsterLoc, areas) {
        this.goalItem = goalItem;
        this.goalLoc = goalLoc;
        this.monster = monster;
        this.monsterLoc = monsterLoc;
        this.monsterAlive = true;
        this.continuePlaying = true;
        this.areas = areas;
    }
}
exports.default = Labyrinth;
//# sourceMappingURL=Labyrinth.js.map