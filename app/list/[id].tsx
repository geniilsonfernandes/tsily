import { QuantitySelector } from "@/components/QuantitySelector";
import { ThemedView } from "@/components/ThemedView";
import { ValueInput } from "@/components/ValueInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from "react-native";

export default function List() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const backgroundColor = useThemeColor({}, "background.5");
  const iconColor = useThemeColor({}, "text.3");
  const textColor = useThemeColor({}, "text");

  const { id } = useLocalSearchParams();

  const handleChangeQuantity = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const NewQuantity = e.nativeEvent.text;
    const MAX_DIGITS = 5;

    if (NewQuantity.length === MAX_DIGITS) {
      return;
    }

    setQuantity(NewQuantity);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setShowOptions(true)
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setShowOptions(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const data = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: "Item 4" },
    { id: "5", name: "Item 5" },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 16,
        }}
      >
        <View>
          <Text>{id}</Text>
          <Text>header</Text>
        </View>
        <View>
          <Text>lista</Text>
        </View>
      </View>
      <ThemedView style={styles.createContainer}>
        <ThemedView colorName="background.1" style={styles.createSheet}>
          <View style={styles.input}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Arroz japones"
                value={product}
                onChangeText={(value) => setProduct(value)}
                style={{ flex: 1, color: textColor }}
                placeholderTextColor={textColor}
              />
            </View>
            {!product && (
              <TouchableOpacity
                onPress={() => {
                  Haptics.selectionAsync();
                }}
                style={{
                  padding: 8,
                }}
              >
                <Feather name="chevron-up" size={18} color={iconColor} />
              </TouchableOpacity>
            )}
            {product && (
              <TouchableOpacity
                onPress={() => {
                  Haptics.selectionAsync();
                }}
                style={{
                  padding: 8,
                }}
              >
                <Feather name="check" size={16} color={iconColor} />
              </TouchableOpacity>
            )}
          </View>
          {showOptions && (
            <>
              <ThemedView
                colorName="background.2"
                style={{
                  height: 1,
                  marginVertical: 6,
                }}
              />
              <View style={styles.optionsContainer}>
                <ValueInput />
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              </View>
            </>
          )}
        </ThemedView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createContainer: {
    padding: 8,
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
  createSheet: {
    width: "100%",
    padding: 8,
    borderRadius: 16,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  optionsContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
});
