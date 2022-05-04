import { read } from "./functions/read.js";
import { map } from "./functions/map.js";
import { turnRight, turnLeft, moveForward } from "./functions/directions.js";
const properties = {};

// PILOT FUNCTION USING 'G', 'D', 'A'

function pilot() {
  for (let i = 0; i < properties.playerTravel.length; i++) {
    switch (properties.playerTravel[i]) {
      case "G":
        turnLeft(properties);
        properties.travelLog.push("turnLeft was called!");
        break;
      case "D":
        turnRight(properties);
        properties.travelLog.push("turnRight was called!");
        break;
      case "A":
        moveForward(properties);
        // **** GUARDS & TREASURES **** \\
        if (
          properties.playerX === properties.treasureX &&
          properties.playerY === properties.treasureY
        ) {
          properties.treasureSize--;
          properties.treasure++;
          if (properties.treasureSize === 0) {
            delete properties.treasureX;
            delete properties.treasureY;
            delete properties.treasureSize;
          }
        } else if (
          properties.playerX === properties.treasureXAlt &&
          properties.playerY === properties.treasureYAlt
        ) {
          properties.treasureSizeAlt--;
          properties.treasure++;
          if (properties.treasureSizeAlt === 0) {
            delete properties.treasureXAlt;
            delete properties.treasureYAlt;
            delete properties.treasureSizeAlt;
          }
        } else if (
          (properties.playerX === properties.mountainX &&
            properties.playerY === properties.mountainY) ||
          (properties.playerX === properties.mountainXAlt &&
            properties.playerY === properties.mountainYAlt)
        ) {
          return console.log("* Mountain in front of me, end of the journey *");
        }
        // **** END OF GUARDS & TREASURES **** \\
        properties.travelLog.push("moveForward was called");
        break;
    }
  }

  console.log(`${properties.playerName}'s history: `, properties.travelLog);
  map(properties);
  console.log(`
  **************************************
  *                                    *
  *    ${properties.playerName} discovered ${properties.treasure} treasures !   *
  *                                    *
  **************************************
  `);
}

// ********* PLAY FUNCTION ********* \\

async function play() {
  await read(properties);
  map(properties);
  pilot();
}

play();
