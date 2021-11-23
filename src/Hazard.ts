import Item from './Item';
export default class Hazard {
    private name: string;
    private desc: string;
    private distracted: string;
    private weakness: Item;
    private cleared:boolean;

    constructor(name: string, desc: string, distract: string, weakness: Item) {
      this.name = name;
      this.desc = desc;
      this.distracted = distract;
      this.weakness = weakness;
      this.cleared = false;
    }

    getName() {
      return this.name;
    }

    activated(): string {
      return this.desc;
    }

    deactivated(): string {
      return this.distracted;
    }

    getWeakness(): Item {
      return this.weakness;
    }

    isCleared():boolean {
      return this.cleared;
    }

    setCleared() {
      this.cleared = true;
    }
}