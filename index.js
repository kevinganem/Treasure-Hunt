// ********* READ FILE ********* \\

const lineReader = require("line-reader");
const file = "./data/data.txt";
const properties = [];

function read() {
  return new Promise((resolve, _reject) => {
    lineReader.eachLine(file, (line, last) => {
      if (line[0].includes("C")) {
        const lineC = line.split(/(?:-| )+/);

        const grid = {
          mapX: parseInt(lineC[1]),
          mapY: parseInt(lineC[2]),
        };

        Object.assign(properties, grid);
      } else if (line[0].includes("M")) {
        const lineM = line.split(/(?:-| )+/);
        if (!properties.mountainX) {
          const mountain = {
            mountainX: parseInt(lineM[1]),
            mountainY: parseInt(lineM[2]),
          };

          Object.assign(properties, mountain);
        } else {
          const mountainAlt = {
            mountainXAlt: parseInt(lineM[1]),
            mountainYAlt: parseInt(lineM[2]),
          };

          Object.assign(properties, mountainAlt);
        }
      } else if (line[0].includes("T")) {
        const lineT = line.split(/(?:-| )+/);
        if (!properties.treasureSize) {
          const treasure = {
            treasureX: parseInt(lineT[1]),
            treasureY: parseInt(lineT[2]),
            treasureSize: parseInt(lineT[3]),
          };

          Object.assign(properties, treasure);
        } else {
          const treasureAlt = {
            treasureXAlt: parseInt(lineT[1]),
            treasureYAlt: parseInt(lineT[2]),
            treasureSizeAlt: parseInt(lineT[3]),
          };

          Object.assign(properties, treasureAlt);
        }
      } else if (line[0].includes("A")) {
        const lineA = line.split(/(?:-| )+/);
        const player = {
          playerName: lineA[1],
          playerX: parseInt(lineA[2]),
          playerY: parseInt(lineA[3]),
          playerDirection: lineA[4],
          playerTravel: lineA[5],
          travelLog: [],
          treasure: 0,
        };

        Object.assign(properties, player);
      } else if (line[0].includes("#")) {
        console.log("Data ignored :", line);
      } else {
        return console.log("Error bad data");
      }
      if (last) {
        resolve();
        return false;
      }
    });
  });
}

// ********* MAP ********* \\

const map = () => {
  const grid = [];

  for (let j = 0; j < properties.mapY; j++) {
    grid.push([]);
    grid[j].push(new Array(properties.mapX));

    for (i = 0; i < properties.mapX; i++) {
      if (i === properties.mountainX && j === properties.mountainY) {
        grid[j][i] = "M";
      } else if (
        i === properties.mountainXAlt &&
        j === properties.mountainYAlt
      ) {
        grid[j][i] = "M";
      } else if (i === properties.treasureX && j === properties.treasureY) {
        grid[j][i] = `T(${properties.treasureSize})`;
      } else if (
        i === properties.treasureXAlt &&
        j === properties.treasureYAlt
      ) {
        grid[j][i] = `T(${properties.treasureSizeAlt})`;
      } else if (i === properties.playerX && j === properties.playerY) {
        grid[j][i] = `A(${properties.playerName})`;
      } else {
        grid[j][i] = " ";
      }
    }
  }
  console.table(grid);
};

// ********* DIRECTION FUNCTIONS ********* \\

// TURN LEFT FUNCTION

function turnLeft() {
  switch (properties.playerDirection) {
    case "N":
      properties.playerDirection = "W";
      break;
    case "W":
      properties.playerDirection = "S";
      break;
    case "S":
      properties.playerDirection = "E";
      break;
    case "E":
      properties.playerDirection = "N";
      break;
  }
}

// TURN RIGHT FUNCTION

function turnRight() {
  switch (properties.playerDirection) {
    case "N":
      properties.playerDirection = "E";
      break;
    case "E":
      properties.playerDirection = "S";
      break;
    case "S":
      properties.playerDirection = "W";
      break;
    case "W":
      properties.playerDirection = "N";
      break;
  }
}

// MOVING FORWARD FUNCTION

function moveForward() {
  if (
    (properties.playerDirection === "N" && properties.playerY <= 0) ||
    (properties.playerDirection === "E" &&
      properties.playerX >= properties.mapX) ||
    (properties.playerDirection === "S" &&
      properties.playerY >= properties.mapY) ||
    (properties.playerDirection === "W" && properties.playerX <= 0)
  ) {
    return console.log("* Cannot move in that direction *");
  } else if (
    properties.playerDirection === "N" &&
    properties.playerY <= properties.mapY
  ) {
    properties.playerY -= 1;
  } else if (
    properties.playerDirection === "E" &&
    properties.playerX < properties.mapX
  ) {
    properties.playerX += 1;
  } else if (
    properties.playerDirection === "S" &&
    properties.playerY < properties.mapY
  ) {
    properties.playerY += 1;
  } else if (
    properties.playerDirection === "W" &&
    properties.playerX <= properties.mapX
  ) {
    properties.playerX -= 1;
  }
}

// PILOT FUNCTION USING 'G', 'D', 'A'

function pilot() {
  for (let i = 0; i < properties.playerTravel.length; i++) {
    switch (properties.playerTravel[i]) {
      case "G":
        turnLeft();
        properties.travelLog.push("turnLeft was called!");
        break;
      case "D":
        turnRight();
        properties.travelLog.push("turnRight was called!");
        break;
      case "A":
        moveForward();
        // GUARDS & TREASURES
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
        properties.travelLog.push("moveForward was called");
        break;
    }
  }

  console.log(`${properties.playerName}'s history: `, properties.travelLog);
  map();
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
  await read();
  map();
  pilot();
}

play();
