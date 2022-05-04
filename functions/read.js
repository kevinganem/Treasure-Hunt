// ********* READ FILE ********* \\

import lineReader from "line-reader";
const file = "./data/data.txt";

export function read(properties) {
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
