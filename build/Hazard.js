"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hazard {
    constructor(name, desc, distract, weakness) {
        this.name = name;
        this.desc = desc;
        this.distracted = distract;
        this.weakness = weakness;
        this.cleared = false;
    }
    getName() {
        return this.name;
    }
    activated() {
        return this.desc;
    }
    deactivated() {
        return this.distracted;
    }
    getWeakness() {
        return this.weakness;
    }
    isCleared() {
        return this.cleared;
    }
    setCleared() {
        this.cleared = true;
    }
}
exports.default = Hazard;
//# sourceMappingURL=Hazard.js.map