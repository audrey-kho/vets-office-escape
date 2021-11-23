"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Monster {
    constructor(name, desc, descL, distracted, weakness) {
        this.name = name;
        this.desc = desc;
        this.descL = descL;
        this.distracted = distracted;
        this.weakness = weakness;
        this.killed = false;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.desc;
    }
    alive() {
        return this.descL;
    }
    dead() {
        this.killed = true;
        return this.distracted;
    }
    isDead() {
        return this.killed;
    }
    getWeakness() {
        return this.weakness;
    }
}
exports.default = Monster;
//# sourceMappingURL=Monster.js.map