import { CreateList } from "@/components/CreateList";
import { List } from "@/components/List";
import { ListModal } from "@/components/ListModal";
import { Search } from "@/components/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { List as ListType, useList } from "@/database/useList";
import { useDisclosure } from "@/hooks/useDisclosure";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

export default function HomeScreen() {
  const [openedCreateList, { toggle: openCreateList, close: closeCreateList }] =
    useDisclosure();
  const [listSelected, setListSelected] = useState<ListType | null>(null);
  const router = useRouter();
  const [listName, setListName] = useState<string>("");
  const [shoppingLists, setShoppingLists] = useState<ListType[] | null>(null);
  const db = useList();

  const handleCreateList = async () => {
    try {
      await db.createList({
        name: listName,
      });
      Alert.alert("Success", "List created successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to create list");
    }
  };

  const getLists = async () => {
    try {
      const lists = await db.list();
      setShoppingLists(lists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <ThemedView colorName="background" style={styles.container}>
      <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
        <View style={styles.header}>
          <ThemedText type="title">Tsily</ThemedText>
          <Pressable style={styles.avatar}>
            <Feather name="user" size={24} />
          </Pressable>
        </View>

        <Search />
      </View>

      <Animated.FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 94, paddingHorizontal: 24 }}
        data={Array.from({ length: 10 }).map((_, index) => ({
          id: index.toString(),
          name: `List ${index}`,
        }))}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <List
            title={item.name}
            quantity={9}
            onPress={() => {
              router.push(`/list/${item.id}`);
            }}
            onLongPress={() => {
              setListSelected(item);
            }}
          />
        )}
        keyExtractor={({ id }, index) => id}
      />

      <ListModal
        opened={!!listSelected}
        onClose={() => {
          setListSelected(null);
        }}
      />
      <CreateList opened={openedCreateList} onClose={closeCreateList} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 96,
    position: "relative",
  },

  button: {
    backgroundColor: "#272324",
    borderRadius: 24,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
  },

  avatar: {
    borderRadius: 24,
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  createButton: {
    backgroundColor: "rgb(78, 78, 78)",
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 24,
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    width: "90%",

    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
