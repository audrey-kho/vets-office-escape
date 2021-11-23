import Area from "./Area";
import Item from "./Item";

export default class Player {
  private inventory: Item[];
  private used: Item[];
  private currentLocation: Area;

  constructor(location: Area) {
    this.inventory = [];
    this.used = [];
    this.currentLocation = location;
  }

  pickupItem(item:string) {
    let areaItem = this.currentLocation.getItem(item);

    if (areaItem != undefined) {
      if(this.inventory.includes(areaItem) || this.used.includes(areaItem)) {
        console.log("You can't pick this up again!");
      } else {
        let msg = "The " + item + " has been added to your inventory.";
        this.inventory.push(areaItem);
        console.log(msg);
      }
    } else {
      console.log("That item doesn't exist here!");
    }
  }

  useItem(item:string) {
    let obj:Item[] = this.inventory.filter(thing => thing.getName() == item);

    if (obj.length > 0) {
      this.inventory = this.inventory.filter(thing => thing != obj[0]);
      this.used.push(obj[0]);
      console.log(obj[0].use());
    } else {
      console.log("You don't have this item!");
    }
  }

  printInventory() {
    let res:string = "";

    if (this.inventory.length > 0 || this.used.length > 0) {
      let inv:string[] = [];
      let usedI:string[] = [];

      this.inventory.forEach(item => {
        inv.push(item.getName());
      });
      this.used.forEach(item => {
        usedI.push(item.getName());
      });

      res += "Inventory: " + inv.join(', ');
      res += "\n";
      res += "Used Items (you can no longer use these): " + usedI.join(', ');
    } else {
      res = "You haven't picked anything up yet!";
    }

    console.log(res);
  }

  inventoryContains(item:string):boolean {
    let obj:Item[] = this.inventory.filter(thing => thing.getName() == item);
    let usedObj: Item[] = this.used.filter(thing => thing.getName() == item);

    if (obj.length > 0 || usedObj.length > 0) {
      return true;
    }

    return false;
  }

  setLocation(dir: string): Area | null {
    let newLoc: Area | null = this.currentLocation.getLocationOf(dir);
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
    } else {
      console.log(this.currentLocation.getDescription() + ' ' + this.currentLocation.availableDirections());
    }
  }

  getLocation(): Area {
    return this.currentLocation;
  }
}