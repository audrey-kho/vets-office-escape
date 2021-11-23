"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(item, desc, action) {
        this.name = item;
        this.desc = desc;
        this.action = action;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.desc;
    }
    use() {
        return this.action;
    }
}
exports.default = Item;
//# sourceMappingURL=Item.js.map