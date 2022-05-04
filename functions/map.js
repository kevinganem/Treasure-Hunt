// ********* MAP ********* \\

export const map = (properties) => {
  const grid = [];

  for (let j = 0; j < properties.mapY; j++) {
    grid.push([]);
    grid[j].push(new Array(properties.mapX));

    for (let i = 0; i < properties.mapX; i++) {
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
