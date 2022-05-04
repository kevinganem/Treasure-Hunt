// ********* DIRECTIONS FUNCTIONS ********* \\

// TURN LEFT FUNCTION

function turnLeft(playerDirection) {
  switch (playerDirection) {
    case "N":
      playerDirection = "W";
      break;
    case "W":
      playerDirection = "S";
      break;
    case "S":
      playerDirection = "E";
      break;
    case "E":
      playerDirection = "N";
      break;
  }
  return playerDirection;
}

// TURN RIGHT FUNCTION

function turnRight(playerDirection) {
  switch (playerDirection) {
    case "N":
      playerDirection = "E";
      break;
    case "E":
      playerDirection = "S";
      break;
    case "S":
      playerDirection = "W";
      break;
    case "W":
      playerDirection = "N";
      break;
  }
  return playerDirection;
}

// MOVING FORWARD FUNCTION

function moveForward(playerDirection, playerX, playerY, mapX, mapY) {
  if (
    (playerDirection === "N" && playerY <= 0) ||
    (playerDirection === "E" && playerX >= mapX) ||
    (playerDirection === "S" && playerY >= mapY) ||
    (playerDirection === "W" && playerX <= 0)
  ) {
    return false;
  } else if (playerDirection === "N" && playerY <= mapY) {
    return true;
  } else if (playerDirection === "E" && playerX < mapX) {
    return true;
  } else if (playerDirection === "S" && playerY < mapY) {
    return true;
  } else if (playerDirection === "W" && playerX <= mapX) {
    return true;
  }
}

module.exports = {
  turnLeft,
  turnRight,
  moveForward,
};
