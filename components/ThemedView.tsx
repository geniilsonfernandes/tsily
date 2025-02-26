import { View, type ViewProps } from "react-native";

import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof typeof Colors.light;
  backgroundColor?: keyof typeof Colors.light;
  borderColor?: keyof typeof Colors.light;
};

export function ThemedView({
  style,
  lightColor,
  colorName,
  backgroundColor,
  borderColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColorValue = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName || backgroundColor || "background"
  );
  const borderColorValue = useThemeColor({}, borderColor ?? "background.1");

  const border = {
    borderWidth: 1,
    borderColor: borderColorValue,
  };

  return (
    <View
      style={[
        { backgroundColor: backgroundColorValue, ...(borderColor && border) },
        style,
      ]}
      {...otherProps}
    />
  );
}
