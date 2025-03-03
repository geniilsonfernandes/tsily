import { Product } from "@/components/ListItem";
import { ListOptions } from "@/components/ListOptions";
import { ProductEntry } from "@/components/ProductEntry";
import { ThemedText } from "@/components/ThemedText";
import { BackButton } from "@/components/ui/BackButton";
import {
  List,
  Product as ProductType,
  useShoppingList,
} from "@/database/useShoppingList";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  }, []);

  const productList = useMemo(() => data?.products || [], [data?.products]);

  const renderList = useCallback(
    ({ item }: { item: ProductType }) => (
      <Product {...item} invalidateList={fetchList} />
    ),
    []
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
        data={productList}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={LinearTransition}
        renderItem={renderList}
      />
      <ProductEntry listId={id} invalidList={fetchList} list={data} />
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
