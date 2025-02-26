import { List } from "@/components/List";
import { Search } from "@/components/Search";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

const shoppingLists = [
  { title: "Lista de Compras do João", totalItems: 5, items: [] },
  { title: "Lista de Compras da Maria", totalItems: 8, items: [] },
  { title: "Lista de Compras do Marco", totalItems: 3, items: [] },
  { title: "Lista de Compras para Viagem", totalItems: 6, items: [] },
  { title: "Lista de Compras do Fim de Semana", totalItems: 4, items: [] },
  { title: "Lista de Compras da Casa Nova", totalItems: 7, items: [] },
  { title: "Lista de Compras do Mês", totalItems: 10, items: [] },
  { title: "Lista de Compras do Fim de Semana", totalItems: 4, items: [] },
  { title: "Lista de Compras da Casa Nova", totalItems: 7, items: [] },
  { title: "Lista de Compras do Mês", totalItems: 10, items: [] },
];

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");
  return (
    <ThemedView colorName="background" style={styles.container}>
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <View style={styles.header}>
          <ThemedText type="title">Tsily</ThemedText>
          <View style={styles.avatar} />
        </View>

        <Search />
        {/* <LinearGradient
          // Background Linear Gradient
          colors={[backgroundColor, "transparent"]}
          style={styles.background}
        /> */}
      </View>

      <Animated.FlatList
        style={{ flex: 1, paddingHorizontal: 16 }}
        data={shoppingLists}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <Link href={`/list/${item.title}`} asChild>
            <TouchableOpacity>
              <List
                title={item.title}
                key={item.title}
                quantity={item.totalItems}
              />
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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
