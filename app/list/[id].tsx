import { ListItem } from "@/components/ListItem";
import { ListOptions } from "@/components/ListOptions";
import { ProductEntry } from "@/components/ProductEntry";
import { ThemedText } from "@/components/ThemedText";
import { BackButton } from "@/components/ui/BackButton";
import { List, useShoppingList } from "@/database/useShoppingList";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function ListView() {
  const { id } = useLocalSearchParams() as { id: string };
  const [data, setData] = useState<List | null>(null);
  const shoppingList = useShoppingList();

  const fetchList = useCallback(async () => {
    try {
      const response = await shoppingList.findById(id);
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  }, [id, shoppingList]);

  const handleCheckProduct = useCallback(
    async (productId: string, checked: boolean) => {
      try {
        await shoppingList.checkProduct({ id: productId, checked });
        fetchList();
      } catch (error) {
        console.error("Error checking product:", error);
      }
    },
    [fetchList, shoppingList]
  );

  const handleDeleteProduct = useCallback(
    async (productId: string) => {
      try {
        await shoppingList.deleteProduct(productId);
        fetchList();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    [fetchList, shoppingList]
  );

  useEffect(() => {
    fetchList();
  }, [fetchList]);

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
            {data?.products.length || 0} produtos
          </ThemedText>
          {data?.budget ? (
            <ThemedText colorName="text.3" type="body">
              {data.budget} / 120,00
            </ThemedText>
          ) : null}
        </View>
      </View>
      <Animated.FlatList
        data={data?.products || []}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={LinearTransition}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onCheck={handleCheckProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      />
      <ProductEntry listId={id} invalidList={fetchList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
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
});
