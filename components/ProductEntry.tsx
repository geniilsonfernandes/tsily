import { QuantitySelector } from "@/components/QuantitySelector";
import { ThemedView } from "@/components/ThemedView";
import { ValueInput } from "@/components/ValueInput";
import { List, Product, useShoppingList } from "@/database/useShoppingList";
import useKeyboardVisibility from "@/hooks/useKeyboardVisibility";
import { useThemeColor } from "@/hooks/useThemeColor";
import useStore from "@/store/useStore";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Animated, {
  BounceIn,
  BounceOut,
  Easing,
  FadeInDown,
} from "react-native-reanimated";
import { Suggestions } from "./Suggestions";

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

type ProductEntryProps = {
  listId: string;
  invalidList: () => void;
  list: List | null;
  productToEdit?: Product;
};

export const ProductEntry: React.FC<ProductEntryProps> = ({
  listId,
  invalidList,
  list,
}) => {
  const { selectedProduct, removeSelectedProduct } = useStore();
  const inputRef = useRef<TextInput>(null);
  const isKeyboardVisible = useKeyboardVisibility();
  const shoppingList = useShoppingList();

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [value, setValue] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textColor = useThemeColor({}, "text");
  const placeholderTextColor = useThemeColor({}, "text.3");

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct.name);
      setQuantity(selectedProduct.quantity);
      setValue(selectedProduct.value);
      inputRef.current?.focus();
    }
  }, [selectedProduct]);

  const handleAddItem = async () => {
    if (!product.trim()) return;

    try {
      const productIsInList = list?.products.find(
        (p) => p.name.toLowerCase() === product.toLowerCase()
      );

      if (productIsInList) {
        await shoppingList.updateProduct({
          id: productIsInList.id,
          checked: productIsInList.checked,
          list_id: productIsInList.list_id,
          name: product,
          quantity: quantity || 1,
          value: value || 0,
        });
      } else if (selectedProduct) {
        await shoppingList.updateProduct({
          id: selectedProduct.id,
          checked: selectedProduct.checked,
          list_id: selectedProduct.list_id,
          name: product,
          quantity: quantity || 1,
          value: value || 0,
        });
        removeSelectedProduct();
      } else {
        await shoppingList.addProduct({
          list_id: listId,
          name: product,
          quantity: quantity || 1,
          value: value || 0,
          checked: false,
        });
      }
      setProduct("");
      setQuantity(1);
      setValue(null);
      invalidList();
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const filterData = useMemo(
    () =>
      product
        ? data.filter((item) =>
            item.toLowerCase().includes(product.toLowerCase())
          )
        : data.slice(0, 10),
    [product]
  );

  const findProductInList = (product: string) => {
    const productIsInList = list?.products.find(
      (p) => p.name.toLowerCase() === product.toLowerCase()
    );
    if (productIsInList) {
      setProduct(productIsInList.name);

      setQuantity(productIsInList.quantity);
      setValue(productIsInList.value);
    } else {
      setProduct(product);
    }

    setShowSuggestions(false);

    return productIsInList;
  };

  return (
    <View style={styles.container}>
      <Suggestions onSelect={findProductInList} suggestions={filterData} />
      <ThemedView
        backgroundColor="background"
        borderColor="background.3"
        style={styles.createSheet}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite o nome do produto"
            value={product}
            onChangeText={(value) => {
              setShowSuggestions(true);
              setProduct(value);
            }}
            style={{ flex: 1, color: textColor, height: 38, fontSize: 16 }}
            placeholderTextColor={placeholderTextColor}
            ref={inputRef}
          />
          <Pressable
            onPress={() => {
              if (product) {
                handleAddItem();
              } else {
                setShowSuggestions(true);
              }
            }}
            disabled={!product}
            style={styles.addButtonContainer}
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
                name={product ? "check" : "shopping-bag"}
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
            <ValueInput value={value} onChangeValue={setValue} />
            <QuantitySelector
              quantity={quantity}
              onChangeQuantity={setQuantity}
            />
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
    width: Dimensions.get("window").width,
  },
  createSheet: {
    width: "100%",
    padding: 8,
    borderRadius: 16,
  },
  addButtonContainer: {
    position: "absolute",
    right: 4,
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
