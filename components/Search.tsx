import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedView } from "./ThemedView";

export const Search = () => {
  const backgroundColor = useThemeColor({}, "background.1");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "text.3");
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.icon}>
        <Feather name="search" size={16} color={textColor} />
      </View>
      <TextInput
        placeholder="Search"
        placeholderTextColor={textColor}
        style={[styles.input, { color: textColor }]}
      />
      <TouchableOpacity>
        <ThemedView colorName="background" style={styles.leftContainer}>
          <Feather name="filter" size={16} color={iconColor} />
        </ThemedView>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 48,
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  leftContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
