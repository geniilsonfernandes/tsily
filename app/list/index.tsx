import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function List() {
  return (
    <View>
      <View style={styles.createButton}>
        <Feather name="plus" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  createButton: {
    height: 48,
    width: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});