// ***** TEST JEST ***** \\

import { turnLeft, turnRight, moveForward } from "./functions/directions";

// DIRECTIONS LEFT

describe("Turn left function", () => {
  it("Should return W from N", () => {
    const direction = "N";
    const result = turnLeft(direction);
    expect(result).toBe("W");
  });
});

describe("Turn left function", () => {
  it("Should return S from W", () => {
    const direction = "W";
    const result = turnLeft(direction);
    expect(result).toBe("S");
  });
});

// DIRECTIONS RIGHT

describe("Turn right function", () => {
  it("Should return E from N", () => {
    const direction = "N";
    const result = turnRight(direction);
    expect(result).toBe("E");
  });
});

describe("Turn right function", () => {
  it("Should return S from E", () => {
    const direction = "E";
    const result = turnRight(direction);
    expect(result).toBe("S");
  });
});

// DIRECTIONS FORWARD

describe("Move forward function", () => {
  it("Should return false because stepping out the map on right side", () => {
    const direction = "E";
    const playerX = 9;
    const mapX = 9;
    const result = moveForward(direction, playerX, 0, mapX, 0);
    expect(result).toBe(false);
  });
});

describe("Move forward function", () => {
  it("Should return false because stepping out the map on bottom side", () => {
    const direction = "S";
    const playerY = 9;
    const mapY = 8;
    const result = moveForward(direction, 0, playerY, 0, mapY);
    expect(result).toBe(false);
  });
});

describe("Move forward function", () => {
  it("Should return true because stepping in the map on top side", () => {
    const direction = "N";
    const playerY = 9;
    const mapY = 9;
    const result = moveForward(direction, 0, playerY, 0, mapY);
    expect(result).toBe(true);
  });
});

describe("Move forward function", () => {
  it("Should return true because stepping in the map on left side", () => {
    const direction = "W";
    const playerX = 6;
    const mapX = 9;
    const result = moveForward(direction, playerX, 0, mapX, 0);
    expect(result).toBe(true);
  });
});
