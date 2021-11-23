import Player from './Player';
import Monster from './Monster';
import {Command, CommandParser} from './Parser';
import Area from './Area';
import Hazard from './Hazard';
import Item from './Item';

const data = require('../data/labyrinth.json');
let p : Player;
let goalItem: Item;
let goalLoc: Area;

let monster: Monster;
let monsterLoc: Area;
let monsterWeakness: string;

let areas : Map<string, Area> = new Map();

function prompt() {
  let continueGame = true;

  if (!monster.isDead()) {
    //move monster
    let randomLoc = areas.get(getRandomKey(areas));
    if (randomLoc != undefined && randomLoc != monsterLoc) {
      monsterLoc = randomLoc;
    }

    if (monsterLoc == p.getLocation()) {
      console.log();
      console.log(monster.getDescription());
      if (!p.inventoryContains(monsterWeakness)) {
        console.log(monster.alive());
        // lose & quit
        return !continueGame;
      } else {
        console.log("\nThere must be something in your inventory that can distract " + monster.getName() + "...");
      }
    }
  }

  console.log('\nWhat would you like to do?');
  return continueGame;
}
//an example input handler function
function handleInput(cmd:Command, arg:string):boolean {
  let promptAgain: boolean = true;
  let cont:boolean = true;
  arg = arg.toUpperCase();

  //an example of handling a particular input
  if(cmd === Command.GO){
    let res = p.setLocation(arg);
    if (res != null) {
      promptAgain = checkWin();
      cont = prompt();
    }
  } else if(cmd === Command.INVENTORY){
    p.printInventory();
    cont = prompt();
  } else if(cmd === Command.TAKE){
    p.pickupItem(arg);
    promptAgain = checkWin();
    cont = prompt();
  } else if(cmd === Command.USE){
    p.useItem(arg);

    if (p.getLocation().getHazard() != null && arg == p.getLocation().getHazard()!.getWeakness().getName()) {
      console.log(p.getLocation().disableHazard());
      promptAgain = checkWin();
      if (promptAgain) {
        cont = prompt();
      }
    } else if (monsterLoc == p.getLocation() && arg == monsterWeakness) {
      console.log(monster.dead());
      promptAgain = checkWin();
      cont = prompt();
    }

  }

  return promptAgain && cont; //return true to indicate that it should prompt for another input
}

function startGame() {
  initLabyrinth();
  console.log(data.intro + '\n');

  p.printLocDetails();
  let parser = new CommandParser(handleInput); //pass in the "handler" callback
  console.log('\nWhat would you like to do?');
  parser.start();
}

function checkWin() {
  if (p.inventoryContains(goalItem.getName()) && p.getLocation() == goalLoc) {
    console.log("You win! You're able to escape through the front door and return to your owner!");
    return false;
  }
  return true;
}

function getRandomKey(collection: Map<string, Area>) {
  let keys = Array.from(collection.keys());
  return keys[Math.floor(Math.random() * keys.length)];
}

function initLabyrinth() {
  // initialize all areas
  data.areas.forEach((a: { items: Item[]; hazard: Hazard | null; name: string; desc: string; }) => {
    let itemArr = [];
    let hazard = null;

    // setting area items
    for (let i = 0; i < a.items.length; i++) {
      for (let j = 0; j < data.items.length; j++) {
        let item = data.items[j];
        if (a.items[i] == item.name) {
          itemArr.push(new Item(item.name, item.desc, item.action));
        }
      }
    }
    // setting area hazard
    if (a.hazard != null) {
      let hazardWeakness: Item;
      for (let i = 0; i < data.hazards.length; i++) {
        if (data.hazards[i].name == a.hazard) {
          for (let j = 0; j < data.items.length; j++) {
            let item = data.items[j];
            if (data.hazards[i].weakness == item.name) {
              hazardWeakness = new Item(item.name, item.desc, item.action);
            }
          }
          hazard = new Hazard(data.hazards[i].name, data.hazards[i].desc, data.hazards[i].distracted, hazardWeakness!);
        }
      }
    }

    let area = new Area(a.name, a.desc, itemArr, hazard);
    areas.set(area.getName(), area);
  });

  // initialize player
  p = new Player(areas.get(data.startLoc)!);
  goalItem = areas.get(data.goalItemLoc)!.getItem(data.goalItem)!;
  goalLoc = areas.get(data.goalArea)!;
  monster = new Monster(data.monster.name, data.monster.desc, data.monster.descL, data.monster.distracted, data.monster.weakness);
  monsterWeakness = data.monster.weakness;
  monsterLoc = areas.get(data.monsterStart)!;

  areas.forEach(area => {
    for (let i = 0; i < data.areas.length; i++) {
      if (area.getName() == data.areas[i].name) {
        area.setArea("NORTH", areas.get(data.areas[i].north)!);
        area.setArea("SOUTH", areas.get(data.areas[i].south)!);
        area.setArea("EAST", areas.get(data.areas[i].east)!);
        area.setArea("WEST", areas.get(data.areas[i].west)!);
      }
    }
  });
}

startGame();

// TO DO:
// - moving monster
// - win/lose checks
// - monster functionalities
