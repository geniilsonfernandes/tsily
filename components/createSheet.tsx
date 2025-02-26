import { QuantitySelector } from "@/components/QuantitySelector";
import { ThemedView } from "@/components/ThemedView";
import { ValueInput } from "@/components/ValueInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    Keyboard,
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    Easing,
    FadeIn,
    FadeInDown,
    FadeOut,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";

const data = [
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

export const CreateSheet = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const iconColor = useThemeColor({}, "text.3");
  const textColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background.5");
    const tagBackgroundColor = useThemeColor({}, "background.1");

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

  const filterData = useMemo(() => {
    return data.filter((item) =>
      item.toLowerCase().includes(product.toLowerCase())
    );
  }, [product]);

  return (
    <View style={styles.container}>
      <View>
        {product && (
          <Animated.FlatList
            entering={FadeInDown.duration(300).easing(
              Easing.inOut(Easing.quad)
            )}
            style={{
              marginBottom: 8,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            data={filterData}
            renderItem={({ item, index }) => (
              <Animated.View
                entering={FadeIn.delay(index * 100)
                  .duration(300)
                  .easing(Easing.inOut(Easing.quad))}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: tagBackgroundColor,
                }}
              >
                <ThemedText style={{ fontSize: 16 }}>{item}</ThemedText>
              </Animated.View>
            )}
          />
        )}
      </View>

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
              style={styles.crateButton}
            >
              <Animated.View
                entering={FadeIn.delay(300)
                  .duration(300)
                  .easing(Easing.inOut(Easing.quad))}
                exiting={FadeOut.duration(300).easing(
                  Easing.inOut(Easing.quad)
                )}
              >
                <Feather name="chevron-up" size={18} color={iconColor} />
              </Animated.View>
            </TouchableOpacity>
          )}
          {product && (
            <TouchableOpacity
              onPress={() => {
                Haptics.selectionAsync();
              }}
              style={styles.crateButton}
            >
              <Animated.View
                entering={FadeIn.delay(300)
                  .duration(300)
                  .easing(Easing.inOut(Easing.quad))}
                exiting={FadeOut.duration(300).easing(
                  Easing.inOut(Easing.quad)
                )}
              >
                <Feather name="check" size={16} color={iconColor} />
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>
        {showOptions && (
          <>
            <Animated.View
              entering={FadeInDown.duration(300).easing(
                Easing.inOut(Easing.quad)
              )}
              style={styles.optionsContainer}
            >
              <ValueInput />
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </Animated.View>
          </>
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
  crateButton: {
    padding: 8,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  optionsContainer: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 8,
    justifyContent: "space-between",
  },
});
