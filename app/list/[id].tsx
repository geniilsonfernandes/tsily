import { ListItem } from "@/components/ListItem";
import { ListOptions } from "@/components/ListOptions";
import { ProductEntry } from "@/components/ProductEntry";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BackButton } from "@/components/ui/BackButton";
import { List, Product, useShoppingList } from "@/database/useShoppingList";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

export default function ListView() {
  const { id } = useLocalSearchParams() as { id: string };
  const [data, setData] = useState<List>();
  const shoppingList = useShoppingList();

  async function list() {
    try {
      const response = await shoppingList.findById(id);
      if (!response) {
        return;
      }
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  const renderProduct = useCallback(
    ({ item }: { item: Product; index: number }) => {
      return <ListItem item={item} onCheck={(id) => console.log(id)} />;
    },
    []
  );

  useEffect(() => {
    list();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => <BackButton to="Home" />,
          headerRight: () => <ListOptions />,
        }}
      />
      <View style={styles.header}>
        <ThemedText colorName="text.1" type="subtitle">
          {data?.name}
        </ThemedText>
        <View style={styles.stats}>
          <ThemedText colorName="text.3" type="body">
            30 produtos
          </ThemedText>
          {data?.budget ? (
            <ThemedText colorName="text.3" type="body">
              {data?.budget} / 120,00
            </ThemedText>
          ) : null}
        </View>
      </View>

      <Animated.FlatList
        contentContainerStyle={{ paddingBottom: 124 }}
        data={data?.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <ThemedView
            colorName="background.2"
            style={{ height: 1, marginVertical: 8, marginHorizontal: 24 }}
          />
        )}
      />
      <ProductEntry listId={id} invalidList={list} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
    marginTop: 8,
  },
  listContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    paddingVertical: 124,
    alignItems: "center",
  },
});
