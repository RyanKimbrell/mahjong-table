export type NumberedSuit = "bam" | "crak" | "dot";

export type Wind = "north" | "east" | "south" | "west";

export type Dragon = "red" | "green" | "white";

export type Tile =
  | {
      id: string;
      type: "number";
      suit: NumberedSuit;
      rank: number;
    }
  | {
      id: string;
      type: "wind";
      wind: Wind;
    }
  | {
      id: string;
      type: "dragon";
      dragon: Dragon;
    }
  | {
      id: string;
      type: "flower";
      flower: number;
    }
  | {
      id: string;
      type: "joker";
    };