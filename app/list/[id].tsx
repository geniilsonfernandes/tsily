import { data, ProductEntry } from "@/components/ProductEntry";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RightActions = (
  progress: SharedValue<number>,
  dragX: SharedValue<number>
) => {
  return (
    <Animated.View style={[styles.action, { backgroundColor: "#e85656" }]}>
      <Feather
        name="trash-2"
        size={16}
        color="#fff"
        style={{
          position: "absolute",
          right: 10,
        }}
      />
      <Text style={styles.actionText}>Excluir</Text>
    </Animated.View>
  );
};

const ListItem = memo(({ name }: { name: string }) => {
  const [checked, setChecked] = useState(false);

  const borderRadius = useSharedValue(12); // Valor inicial do borderRadius
  const backgroundColor = useSharedValue("transparent");
  const borderColor = useSharedValue("#DEDEDE");

  const animatedStyle = useAnimatedStyle(() => ({
    borderRadius: withSpring(borderRadius.value, {
      damping: 10,
      stiffness: 100,
    }),
    backgroundColor: withSpring(backgroundColor.value, {
      damping: 10,
      stiffness: 100,
    }),
    borderColor: withSpring(borderColor.value, {
      damping: 10,
      stiffness: 100,
    }),
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setChecked(!checked);
    if (checked) {
      backgroundColor.value = "transparent";
      borderColor.value = "#DEDEDE";
    } else {
      backgroundColor.value = "#7faf76";
      borderColor.value = "#7faf76";
    }
    borderRadius.value = 8; // Altera o borderRadius durante o press
  };

  const handlePressOut = () => {
    borderRadius.value = 12; // Volta ao borderRadius original
  };

  return (
    <ReanimatedSwipeable
      renderRightActions={RightActions}
      friction={2}
      rightThreshold={200}
    >
      <ThemedView style={styles.item}>
        <AnimatedPressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.button, animatedStyle]}
        >
          {checked && (
            <Animated.View
              entering={FadeIn.duration(300).easing(Easing.inOut(Easing.quad))}
              exiting={FadeOut.duration(300).easing(Easing.inOut(Easing.quad))}
            >
              <Feather name="check" size={16} color="#fff" />
            </Animated.View>
          )}
        </AnimatedPressable>

        <View style={styles.itemContent}>
          <ThemedText
            colorName="text.1"
            type="body"
            style={{
              textDecorationLine: checked ? "line-through" : "none",
              opacity: checked ? 0.5 : 1,
            }}
          >
            {name}
          </ThemedText>
          <View style={styles.itemFooter}>
            <ThemedText colorName="text.3" type="body">
              3
            </ThemedText>
            <ThemedText colorName="text.3" type="body">
              $ 5.45
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ReanimatedSwipeable>
  );
});

export default function List() {
  const router = useRouter();
  const { id } = useLocalSearchParams() as { id: string };

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return <ListItem name={item + index} />;
    },
    []
  );

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
        }}
      />
      <View style={styles.header}>
        <ThemedText colorName="text.1" type="subtitle">
          {id}
        </ThemedText>
      </View>
      <Animated.FlatList
        style={styles.listContainer}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        contentInsetAdjustmentBehavior="automatic"
        maxToRenderPerBatch={15}
        windowSize={21}
      />
      <ProductEntry />
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
  listContainer: {
    padding: 8,
    paddingHorizontal: 16,
    marginBottom: 84,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  button: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  action: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  actionText: {
    color: "white",
    fontSize: 16,
  },
});
