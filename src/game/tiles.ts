import {
  Dragon,
  NumberedSuit,
  Tile,
  Wind,
} from "./types";

export function createTileSet(): Tile[] {
  const tiles: Tile[] = [];

  const suits: NumberedSuit[] = [
    "bam",
    "crak",
    "dot",
  ];

  for (const suit of suits) {
    for (let rank = 1; rank <= 9; rank++) {
      for (let copy = 1; copy <= 4; copy++) {
        tiles.push({
          id: `${suit}-${rank}-${copy}`,
          type: "number",
          suit,
          rank,
        });
      }
    }
  }

  const winds: Wind[] = [
    "north",
    "east",
    "south",
    "west",
  ];

  for (const wind of winds) {
    for (let copy = 1; copy <= 4; copy++) {
      tiles.push({
        id: `${wind}-${copy}`,
        type: "wind",
        wind,
      });
    }
  }

  const dragons: Dragon[] = [
    "red",
    "green",
    "white",
  ];

  for (const dragon of dragons) {
    for (let copy = 1; copy <= 4; copy++) {
      tiles.push({
        id: `${dragon}-dragon-${copy}`,
        type: "dragon",
        dragon,
      });
    }
  }

  for (let flower = 1; flower <= 8; flower++) {
    tiles.push({
      id: `flower-${flower}`,
      type: "flower",
      flower,
    });
  }

  for (let joker = 1; joker <= 8; joker++) {
    tiles.push({
      id: `joker-${joker}`,
      type: "joker",
    });
  }

  return tiles;
}