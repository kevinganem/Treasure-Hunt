// ********* DIRECTIONS FUNCTIONS ********* \\

// TURN LEFT FUNCTION

export function turnLeft(properties) {
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

export function turnRight(properties) {
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

export function moveForward(properties) {
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
