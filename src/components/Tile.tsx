import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Tile as TileData } from "../game/types";

type Props = {
  tile: TileData;
  selected?: boolean;
  onPress?: () => void;
  width: number;
};

function getTileLabel(tile: TileData): string {
  switch (tile.type) {
    case "number":
      return `${tile.rank}\n${tile.suit.toUpperCase()}`;

    case "wind":
      return tile.wind.slice(0, 1).toUpperCase();

    case "dragon":
      return `${tile.dragon.slice(0, 1).toUpperCase()}\nDR`;

    case "flower":
      return `F${tile.flower}`;

    case "joker":
      return "J";
  }
}

export function Tile({
  tile,
  selected = false,
  onPress,
  width,
}: Props) {
  const height = width * 1.4;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.wrapper,
        {
          width,
          height,
        },
        selected && styles.selected,
      ]}
    >
      <View style={styles.face}>
        <Text
          style={[
            styles.label,
            {
              fontSize: Math.max(10, width * 0.28),
            },
          ]}
        >
          {getTileLabel(tile)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 6,
    backgroundColor: "#d8d2bd",
    paddingBottom: 5,
  },

  face: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#f7f2df",
  },

  label: {
    textAlign: "center",
    fontWeight: "700",
  },

  selected: {
    transform: [{ translateY: -12 }],
  },
});