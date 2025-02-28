import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";

const listNameSugestion = [
  "Feira da Semana",
  `Lista de ${dayjs().locale("pt-br").format("MMMM")}`,
  `${dayjs().format("DD/MM/YYYY")}`,
  "Compras Mensais",
  "Itens de Padaria",
  "Carnes e Frios",
  "Produtos de Limpeza",
  "Farmácia",
  "Lanches e Snacks",
  "Café da Manhã",
  "Churrasco",
  "Jantar Especial",
];
export const CreateList = () => {
  const [listName, setListName] = useState("");
  const [listBudget, setListBudget] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const height = useSharedValue(1);

  const setListNameSugestion = (name: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setListName(name);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    height.value = withTiming(isExpanded ? 300 : 450, { duration: 300 }); // Altera altura suavemente
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: height.value > 0 ? 1 : 0,
  }));

  const handleIncrement = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setListBudget(String(Number(listBudget) + 50));
  };

  const handleDecrement = () => {
    if (Number(listBudget) > 0) {
      setListBudget(String(Number(listBudget) - 50));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const handleGetRandomName = () => {
    const randomIndex = Math.floor(Math.random() * listNameSugestion.length);
    const randomName = listNameSugestion[randomIndex];
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setListName(randomName);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.closeButton}
        onPress={toggleExpand}
        accessibilityRole="button"
      >
        <Feather name="x" size={16} color="rgb(140, 140, 140)" />
        <ThemedText style={styles.closeText}>Fechar</ThemedText>
      </Pressable>
      <Animated.View style={[styles.modal]}>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nome da lista"
              style={[
                styles.input,
                {
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                },
              ]}
              value={listName}
              onChangeText={setListName}
            />
            <Feather
              name="repeat"
              size={18}
              style={styles.inputIcon}
              color="rgb(140, 140, 140)"
              onPress={() => handleGetRandomName()}
            />
          </View>
          <FlatList
            data={listNameSugestion}
            horizontal
            contentContainerStyle={styles.suggestionContainer}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <Pressable
                style={styles.suggestion}
                onPress={() => setListNameSugestion(item)}
                accessibilityRole="button"
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(item) => item}
          />

          <Feather
            name={!isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            style={styles.icon}
            onPress={toggleExpand}
            color="rgb(197, 197, 197)"
          />

          {isExpanded && (
            <Animated.View
              entering={FadeInUp.duration(300)}
              style={styles.budgetContainer}
            >
              <TextInput
                placeholder="Orçamento da lista"
                style={[
                  styles.input,
                  {
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  },
                ]}
                value={listBudget}
                onChangeText={setListBudget}
                keyboardType="numeric"
              />
              <Pressable
                style={[styles.budgetButton, { marginRight: 46 }]}
                onPress={handleDecrement}
                accessibilityRole="button"
              >
                <Feather name="minus" size={16} color="rgb(18, 18, 18)" />
              </Pressable>
              <Pressable
                style={styles.budgetButton}
                onPress={handleIncrement}
                accessibilityRole="button"
              >
                <Feather name="plus" size={16} color="rgb(18, 18, 18)" />
              </Pressable>
            </Animated.View>
          )}
        </View>

        <Pressable style={styles.createButton} accessibilityRole="button">
          <Text style={styles.createButtonText}>Criar lista</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  modal: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DBDBDB",
    borderRadius: 24,
    padding: 8,

    justifyContent: "space-between",
  },
  closeButton: {
    backgroundColor: "rgba(245, 245, 245, 0.83)",
    borderWidth: 1,
    borderColor: "rgb(223, 223, 223)",
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    marginBottom: 10,
    position: "absolute",
    top: -32,
  },
  closeText: {
    color: "rgb(140, 140, 140)",
    fontSize: 14,
  },
  suggestion: {
    backgroundColor: "rgba(245, 245, 245, 0.83)",
    borderWidth: 1,
    borderColor: "rgb(223, 223, 223)",
    borderRadius: 8,
    paddingHorizontal: 9,
    padding: 4,
  },
  separator: {
    width: 8,
  },
  collapseContainer: {
    flex: 1,
  },
  suggestionContainer: {
    marginTop: 8,
  },
  suggestionText: {
    color: "rgb(78, 78, 78)",
    fontSize: 12,
    textAlign: "center",
  },

  content: {
    alignItems: "center",
  },

  input: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgb(243, 243, 243)",
    paddingHorizontal: 16,

    width: "100%",
  },
  inputIcon: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 16,
    alignSelf: "center",
  },

  inputContainer: {
    flexDirection: "row",
  },

  icon: {
    alignSelf: "center",
    marginVertical: 8,
  },
  createButton: {
    backgroundColor: "rgb(78, 78, 78)",
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,

    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  budgetContainer: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  budgetButton: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 40,
    height: 40,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 4,
    
  },
});
