import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type QuantitySelectorProps = {
  quantity: string;
  setQuantity: React.Dispatch<React.SetStateAction<string>>;
};
export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  setQuantity,
}) => {
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "text.3");
  const textColor = useThemeColor({}, "text");
  const handleDecrease = () => {
    Haptics.selectionAsync();
    if (+quantity > 0) {
      setQuantity((prev) => String(Math.max(0, +prev - 1)));
    }
  };

  const handleIncrease = () => {
    Haptics.selectionAsync();
    setQuantity((prev) => String(+prev + 1));
  };

  return (
    <View style={styles.constainer}>
      <View style={[styles.input, { backgroundColor }]}>
        <Feather name="shopping-bag" size={18} color={iconColor} />
        <TextInput
          placeholder="quant."
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="none"
          autoComplete="off"
          style={{ flex: 1, color: textColor }}
          value={quantity.toString()}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={handleDecrease}
      >
        <Feather name="minus" size={18} color={iconColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={handleIncrease}
      >
        <Feather name="plus" size={18} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 100,
    borderRadius: 10,
    height: 42,
    paddingHorizontal: 8,
    backgroundColor: "#5B5B5B",
    borderColor: "#DBDBDB",
    borderWidth: 1,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: 42,
    height: 42,
    borderRadius: 100,
    paddingHorizontal: 8,
    backgroundColor: "#5B5B5B",
  },
});
