import Item from './Item';
import Hazard from './Hazard';

export default class Area {
  private name: string;
  private desc: string;
  private items: Item[];
  private hazard: Hazard | null;

  private north?: Area | null;
  private south?: Area | null;
  private east?: Area | null;
  private west?: Area | null;

  constructor(name: string, desc:string, items: Item[] = [], hazard: Hazard | null) {
    this.name = name;
    this.desc = desc;
    this.items = items;
    this.hazard = hazard;

    this.north = null;
    this.south = null;
    this.east = null;
    this.west = null;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    let str = this.desc;

    this.items.forEach(item => {
      str += " " + item.getDescription();
    });

    return str;
  }

  getItem(item:string): Item|undefined {
    let toGet = this.items.filter(obj => obj.getName() === item);
    if (toGet.length > 0) {
      return toGet[0];
    }
    return undefined;
  }

  setItem(item:Item):void {
    this.items.push(item);
  }

  hasHazards():boolean {
    return this.hazard != undefined;
  }

  disableHazard(): string {
    let str = "";
    if (this.hazard != null) {
      this.hazard.setCleared();
      str += this.hazard.deactivated();
      str += ' ' + this.availableDirections();
    }
    return str;
  }

  getHazard():Hazard | null {
    if (this.hazard != null) {
      return this.hazard;
    } else {
      return null;
    }
  }

  passable():boolean {
    let bool = true;
    if (this.hazard != undefined && !this.hazard.isCleared()) {
      bool = false;
    }
    return bool;
  }

  hazardMsg():string {
    let msg = "";
    if (this.hazard != undefined) {
      if (this.passable()) {
        msg = this.hazard.deactivated();
      } else {
        msg = this.hazard.activated();
      }
    }

    return msg;
  }

  availableDirections(): string {
    let dir: string[] = [];
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

  getLocationOf(direction:string): Area | null {
    if (direction == "NORTH") {
      if(this.north == undefined) {
        console.log("It's a dead end! Choose another direction.");
      } else if (this.hazard != undefined && !this.passable()) {
        console.log(this.hazardMsg());
      } else {
        return this.north;
      }
    } else if (direction == "SOUTH") {
      if(this.south == undefined) {
        console.log("It's a dead end! Choose another direction.");
      } else if (this.hazard != undefined && !this.passable()) {
        console.log(this.hazardMsg());
      } else {
        return this.south;
      }
    } else if (direction == "EAST") {
      if(this.east == undefined) {
        console.log("It's a dead end! Choose another direction.");
      } else if (this.hazard != undefined && !this.passable()) {
        console.log(this.hazardMsg());
      } else {
        return this.east;
      }
    } else if (direction == "WEST") {
      if(this.west == undefined) {
        console.log("It's a dead end! Choose another direction.");
      } else if (this.hazard != undefined && !this.passable()) {
        console.log(this.hazardMsg());
      } else {
        return this.west;
      }
    } else {
      console.log("You can't go in this direction!");
    }
    return null;
  }

  setArea(direction:string, area:Area):void {
    if (direction === "NORTH") {
      this.north = area;
    } else if (direction === "SOUTH") {
      this.south = area;
    } else if (direction === "EAST") {
      this.east = area;
    } else if (direction === "WEST") {
      this.west = area;
    }
  }
}