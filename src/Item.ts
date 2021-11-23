export default class Item {
  private name: string;
  private desc: string;
  private action: string;

  constructor(item: string, desc: string, action: string) {
    this.name = item;
    this.desc = desc;
    this.action = action;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.desc;
  }

  use(): string {
    return this.action;
  }
}