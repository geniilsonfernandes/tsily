import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const ValueInput = () => {
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "text.3");
  const textColor = useThemeColor({}, "text");
  return (
    <View style={[styles.input, { backgroundColor }]}>
      <Feather name="dollar-sign" size={18} color={iconColor} />
      <TextInput
        placeholder="valor"
        style={{ flex: 1, color: textColor }}
        keyboardType="numeric"
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="none"
        autoComplete="off"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "#5B5B5B",
    borderColor: "#DBDBDB",
    borderWidth: 1,
  },
});
