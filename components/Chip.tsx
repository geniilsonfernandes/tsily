import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type ChipProps = {
    label: string;
};

export const Chip: React.FC<ChipProps> = ({label}) => {
  return (
    <ThemedView colorName="background.1" borderColor="background.3" style={styles.container}>
      <ThemedText colorName="text.2" style={{ fontSize: 16 }}>{label}</ThemedText>
    </ThemedView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});