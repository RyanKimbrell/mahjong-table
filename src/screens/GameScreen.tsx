import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import * as Haptics from "expo-haptics";

import { Tile } from "../components/Tile";
import { createWall } from "../game/wall";

const initialWall = createWall();
const initialHand = initialWall.slice(0, 14);

export function GameScreen() {
  const [selectedTiles, setSelectedTiles] =
    useState<Set<string>>(new Set());

  const { width } = useWindowDimensions();

  function toggleTile(id: string) {
    Haptics.selectionAsync();

    setSelectedTiles((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  const horizontalPadding = 32;
  const availableWidth = width - horizontalPadding;

  const tileGap = 4;
  const totalGapWidth =
    tileGap * (initialHand.length - 1);

  const tileWidth =
    (availableWidth - totalGapWidth) /
    initialHand.length;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.table}>
        {/* NORTH */}
        <View style={styles.northPlayer}>
          <Text style={styles.playerName}>
            North
          </Text>

          <View style={styles.hiddenHandHorizontal}>
            {Array.from({ length: 13 }).map((_, index) => (
              <View
                key={index}
                style={styles.hiddenTileHorizontal}
              />
            ))}
          </View>
        </View>

        {/* WEST */}
        <View style={styles.westPlayer}>
          <Text style={styles.playerName}>
            West
          </Text>

          <View style={styles.hiddenHandVertical}>
            {Array.from({ length: 13 }).map((_, index) => (
              <View
                key={index}
                style={styles.hiddenTileVertical}
              />
            ))}
          </View>
        </View>

        {/* EAST */}
        <View style={styles.eastPlayer}>
          <Text style={styles.playerName}>
            East
          </Text>

          <View style={styles.hiddenHandVertical}>
            {Array.from({ length: 13 }).map((_, index) => (
              <View
                key={index}
                style={styles.hiddenTileVertical}
              />
            ))}
          </View>
        </View>

        {/* CENTER TABLE */}
        <View style={styles.centerArea}>
          <View style={styles.turnIndicator}>
            <Text style={styles.turnText}>
              Your Turn
            </Text>
          </View>

          <Text style={styles.centerLabel}>
            Discards
          </Text>
        </View>

        {/* PLAYER */}
        <View style={styles.playerArea}>
          <Text style={styles.youLabel}>
            You
          </Text>

          <View style={styles.hand}>
            {initialHand.map((tile) => (
              <Tile
                key={tile.id}
                tile={tile}
                selected={selectedTiles.has(tile.id)}
                onPress={() => toggleTile(tile.id)}
                width={tileWidth}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#102f28",
  },

  table: {
    flex: 1,
    position: "relative",
    backgroundColor: "#173f35",
  },

  northPlayer: {
    position: "absolute",
    top: 8,
    left: "50%",
    transform: [{ translateX: -160 }],
    width: 320,
    alignItems: "center",
  },

  westPlayer: {
    position: "absolute",
    left: 14,
    top: "24%",
    bottom: 165,
    justifyContent: "center",
    alignItems: "center",
  },

  eastPlayer: {
    position: "absolute",
    right: 14,
    top: "24%",
    bottom: 165,
    justifyContent: "center",
    alignItems: "center",
  },


  playerName: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 6,
  },

  hiddenHandHorizontal: {
    flexDirection: "row",
    gap: 2,
  },

  hiddenTileHorizontal: {
    width: 18,
    height: 26,
    borderRadius: 3,
    backgroundColor: "#d8d2bd",
    borderWidth: 1,
    borderColor: "#aaa48e",
  },

  hiddenHandVertical: {
    gap: 2,
  },

  hiddenTileVertical: {
    width: 24,
    height: 16,
    borderRadius: 3,
    backgroundColor: "#d8d2bd",
    borderWidth: 1,
    borderColor: "#aaa48e",
  },

  centerArea: {
    position: "absolute",
    left: "25%",
    right: "25%",
    top: "24%",
    bottom: 165,
    borderRadius: 20,
    backgroundColor: "#1f5145",
    borderWidth: 2,
    borderColor: "#2f6d5e",
    justifyContent: "center",
    alignItems: "center",
  },

  centerLabel: {
    color: "#8db5a9",
    fontSize: 14,
    fontWeight: "600",
  },

  turnIndicator: {
    position: "absolute",
    top: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f3e7b3",
  },

  turnText: {
    color: "#173f35",
    fontSize: 13,
    fontWeight: "800",
  },

  playerArea: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 155,
    justifyContent: "flex-end",
  },

  youLabel: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 4,
  },

  hand: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
});