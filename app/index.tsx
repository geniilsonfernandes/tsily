import { List } from "@/components/List";
import { Search } from "@/components/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

const SkeletonItem = () => {
  return (
    <ThemedView
      colorName="background.1"
      style={{
        height: 70,
        borderRadius: 8,
        overflow: "hidden",
      }}
    ></ThemedView>
  );
};
export default function HomeScreen() {
  const shoppingLists = useQuery(api.shopping.getShoppingLists);
  return (
    <ThemedView colorName="background" style={styles.container}>
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <View style={styles.header}>
          <ThemedText type="title">Tsily</ThemedText>
          <View style={styles.avatar} />
        </View>

        <Search />
      </View>
      {!shoppingLists ? (
        <Animated.FlatList
          style={{ flex: 1, paddingHorizontal: 16 }}
          data={Array(5).fill(0)} // 5 Skeletons
          keyExtractor={(_, index) => `skeleton-${index}`}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={() => <SkeletonItem />}
        />
      ) : (
        <Animated.FlatList
          style={{ flex: 1, paddingHorizontal: 16 }}
          data={shoppingLists}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item }) => (
            <Link href={`/list/${item._id}`} asChild>
              <TouchableOpacity>
                <List title={item.name} quantity={9} />
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={({ _id }, index) => _id}
        />
      )}
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

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: "red",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  background: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    bottom: -50,
    height: 50,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
