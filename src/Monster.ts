import Item from './Item';

export default class Monster {
  private name: string;
  private desc: string;
  private descL: string;
  private distracted: string;
  private weakness: Item;
  private killed: boolean;

  constructor(name: string, desc: string, descL: string, distracted: string, weakness: Item) {
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

  getDescription(): string {
    return this.desc;
  }

  alive(): string {
    return this.descL;
  }

  dead(): string {
    this.killed = true;
    return this.distracted;
  }

  isDead(): boolean {
    return this.killed;
  }

  getWeakness(): Item {
    return this.weakness;
  }
}