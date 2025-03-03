import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { ThemedView } from "./ThemedView";

export const ValueInput: React.FC<TextInputProps> = (props) => {
  const backgroundColor = useThemeColor({}, "background");
  const backgroundColorInput = useThemeColor({}, "background.1");
  const iconColor = useThemeColor({}, "text.3");
  const textColor = useThemeColor({}, "text");
  return (
    <ThemedView
      backgroundColor="background.1"
      borderColor="background.2"
      style={styles.input}
    >
      <Feather name="dollar-sign" size={18} color={iconColor} />
      <TextInput
        placeholder="valor"
        style={{
          flex: 1,
          color: textColor,
          fontSize: 16,
        }}
        keyboardType="numeric"
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="none"
        autoComplete="off"
        {...props}
      />
    </ThemedView>
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
  },
});
