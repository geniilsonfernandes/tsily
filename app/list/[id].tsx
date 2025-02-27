import { ListItem } from "@/components/ListItem";
import { ListOptions } from "@/components/ListOptions";
import { ProductEntry } from "@/components/ProductEntry";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMutation, useQuery } from "convex/react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

export default function List() {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };
  const list = useQuery(api.shopping.getShoppingListById, {
    id: id as Id<"shopping_lists">,
  });

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onCheck = useMutation(api.shopping.checkItem);

  const renderItem = useCallback(
    ({ item }: { item: Doc<"items">; index: number }) => {
      return (
        <ListItem
          item={item}
          onCheck={(id) => onCheck({ id, checked: !item.checked })}
        />
      );
    },
    []
  );

  // variables

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Feather name="chevron-left" size={24} />
            </Pressable>
          ),
          headerRight: () => (
            <ListOptions
              onOpenSheet={() => {
                bottomSheetRef.current?.expand();
              }}
            />
          ),
        }}
      />
      <View style={styles.header}>
        <ThemedText colorName="text.1" type="subtitle">
          {list?.name}
        </ThemedText>
        <View style={styles.stats}>
          <ThemedText colorName="text.3" type="body">
            30 produtos
          </ThemedText>
          <ThemedText colorName="text.3" type="body">
            300,00 / 120,00
          </ThemedText>
        </View>
      </View>

      <Animated.FlatList
        contentContainerStyle={{ paddingBottom: 124 }}
        data={list?.items || []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => (
          <ThemedView
            colorName="background.2"
            style={{ height: 1, marginVertical: 8, marginHorizontal: 24 }}
          />
        )}
      />
      <ProductEntry listId={id} />
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
  backdrop: {
    backgroundColor: "red",
    height: "100%",
  },
});
