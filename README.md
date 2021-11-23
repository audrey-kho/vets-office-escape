# Vet's Office Escape
A simple text-based adventure game played on the command line, where the player is a golden retriever puppy trying to escape his vet's office.

## System Requirements
- git
- npm
- Node
- TypeScript

## Game Setup
1. On your command line, run
`git clone git@github.com:audrey-kho/vets-office-escape.git`
2. After cloning, `cd` into the project folder
3. Run the following commands:\
`npm install`\
`tsc`\
`node build/app.js`

4. Enjoy the game!


## Game Commands
- **GO [direction]** lets the player move in a particular direction to another area.
- **LOOK** lets the player see the area's description again. Optionally, you can also support an argument that lets the player "look at" an item or detail.
- **TAKE [item]** lets the player pick up an item from the environment.
- **USE [item]** lets the player use an item they have picked up to overcome a hazard or monster.
- **INVENTORY** gives the player a list of items they have picked up.