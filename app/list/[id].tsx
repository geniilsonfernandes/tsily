import { ThemedView } from "@/components/ThemedView";
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
  const [quantity, setQuantity] = useState("");
  const [showOptions, setShowOptions] = useState(false);
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
      <View style={styles.createContainer}>
        <View style={styles.createButton}>
          <View style={styles.input}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                flex: 1,
              }}
            >
              <TextInput placeholder="Arroz japones" style={{ flex: 1 }} />
            </View>
            <TouchableOpacity
              onPress={() => {
                Haptics.selectionAsync();
              }}
              style={{
                padding: 8,
              }}
            >
              <Feather name="chevron-up" size={18} color="#868686" />
            </TouchableOpacity>
          </View>
          {showOptions && (
            <>
              <ThemedView
                style={{
                  height: 1,
                  marginVertical: 4,
                  opacity: 0.4,
                  backgroundColor: "#E6E6E6",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    flex: 1,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    backgroundColor: "#fff",
                    borderColor: "#E6E6E6",
                    borderWidth: 1,
                  }}
                >
                  <Feather name="dollar-sign" size={18} color="#868686" />
                  <TextInput
                    placeholder="valor"
                    style={{ flex: 1 }}
                    keyboardType="numeric"
                    autoCorrect={false}
                    autoCapitalize="none"
                    textContentType="none"
                    autoComplete="off"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    width: 100,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    backgroundColor: "#fff",
                    borderColor: "#E6E6E6",
                    borderWidth: 1,
                  }}
                >
                  <Feather name="shopping-bag" size={18} color="#868686" />
                  <TextInput
                    placeholder="quant."
                    autoCorrect={false}
                    autoCapitalize="none"
                    textContentType="none"
                    autoComplete="off"
                    style={{ flex: 1 }}
                    value={quantity.toString()}
                    onChange={handleChangeQuantity}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                    width: 42,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    backgroundColor: "#fff",
                  }}
                  onPress={() => {
                    Haptics.selectionAsync();
                    if (+quantity > 0) {
                      const newQuantity = +quantity - 1;
                      setQuantity(newQuantity.toString());
                    }
                  }}
                >
                  <Feather name="minus-square" size={18} color="#868686" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                    width: 42,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                    backgroundColor: "#fff",
                  }}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setQuantity(String(+quantity + 1));
                  }}
                >
                  <Feather name="plus-square" size={18} color="#868686" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFF",
  },
  createContainer: {
    padding: 8,
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  createButton: {
    width: "100%",

    backgroundColor: "#F5F5F5",

    padding: 8,
    borderRadius: 8,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
