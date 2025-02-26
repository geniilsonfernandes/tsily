import { QuantitySelector } from "@/components/QuantitySelector";
import { ThemedView } from "@/components/ThemedView";
import { ValueInput } from "@/components/ValueInput";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  Easing,
  FadeInDown,
} from "react-native-reanimated";
import { SuggestionsList } from "./SuggestionsList";

export const data = [
  "Arroz",
  "Feijão",
  "Macarrão",
  "Açúcar",
  "Sal",
  "Óleo",
  "Farinha de trigo",
  "Leite",
  "Café",
  "Manteiga",
  "Ovos",
  "Pão",
  "Queijo",
  "Presunto",
  "Carne bovina",
  "Carne de frango",
  "Peixe",
  "Batata",
  "Cebola",
  "Alho",
  "Tomate",
  "Cenoura",
  "Alface",
  "Banana",
  "Maçã",
  "Laranja",
  "Uva",
  "Pera",
  "Melancia",
  "Manga",
  "Iogurte",
  "Refrigerante",
  "Suco",
  "Água mineral",
  "Biscoito",
  "Chocolate",
  "Sorvete",
  "Molho de tomate",
  "Maionese",
  "Mostarda",
  "Papel higiênico",
  "Detergente",
  "Sabão em pó",
  "Amaciante",
  "Shampoo",
  "Condicionador",
  "Creme dental",
  "Escova de dente",
  "Sabonete",
  "Desodorante",
];

const MAX_DIGITS = 5;

export const ProductEntry = () => {
  const inputRef = useRef<TextInput>(null);
  const isKeyboardVisible = useKeyboardVisibility();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const textColor = useThemeColor({}, "text");
  const placeholderTextColor = useThemeColor({}, "text.3");

  const filterData = useMemo(() => {
    if (!product) {
      return [];
    }
    return data.filter((item) =>
      item.toLowerCase().includes(product.toLowerCase())
    );
  }, [product]);

  return (
    <View style={styles.container}>
      <SuggestionsList data={filterData} />
      <ThemedView
        backgroundColor="background.1"
        borderColor="background.3"
        style={styles.createSheet}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Arroz japones"
            value={product}
            onChangeText={(value) => setProduct(value)}
            style={{ flex: 1, color: textColor }}
            placeholderTextColor={placeholderTextColor}
            ref={inputRef}
          />

          <Pressable
            pointerEvents={product ? "auto" : "none"}
            onPress={() => {
              Haptics.selectionAsync();
              if (!product) {
                inputRef.current?.focus();
              }
            }}
            disabled={!product}
            style={() => [
              {
                position: "absolute",
                right: 4,
              },
            ]}
          >
            <Animated.View
              entering={BounceIn.delay(300)
                .duration(300)
                .easing(Easing.inOut(Easing.quad))}
              exiting={BounceOut.duration(300).easing(
                Easing.inOut(Easing.quad)
              )}
              style={styles.addButton}
            >
              <Feather
                name={product ? "check" : "search"}
                size={16}
                color="#DEDEDE"
              />
            </Animated.View>
          </Pressable>
        </View>
        {isKeyboardVisible && (
          <Animated.View
            entering={FadeInDown.duration(200).easing(
              Easing.inOut(Easing.quad)
            )}
            style={styles.optionsContainer}
          >
            <ValueInput />
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </Animated.View>
        )}
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  createSheet: {
    width: "100%",
    padding: 8,
    borderRadius: 16,
  },
  addButton: {
    padding: 8,
    backgroundColor: "#5B5B5B",
    borderRadius: 100,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 4,
  },

  optionsContainer: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 8,
    justifyContent: "space-between",
  },
});
