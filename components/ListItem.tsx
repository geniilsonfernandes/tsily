import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Product } from "@/database/useShoppingList";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { memo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
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
    <Animated.View style={[styles.action, { backgroundColor: "#F96868" }]}>
      <Feather
        name="trash-2"
        size={16}
        color="#fff"
        style={{
          position: "absolute",
          right: 10,
        }}
      />
    </Animated.View>
  );
};

export const ListItem = memo(
  ({ item, onCheck }: { item: Product; onCheck: (id: string) => void }) => {
    const [checked, setChecked] = useState(item.checked);

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
        <ThemedView style={styles.container}>
          <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.button, animatedStyle]}
            onPress={() => onCheck(item.id)}
          >
            {checked ? (
              <Animated.View
                entering={FadeIn.duration(300).easing(
                  Easing.inOut(Easing.quad)
                )}
                exiting={FadeOut.duration(300).easing(
                  Easing.inOut(Easing.quad)
                )}
              >
                <Feather name="check" size={16} color="#fff" />
              </Animated.View>
            ) : null}
          </AnimatedPressable>

          <View style={styles.content}>
            <ThemedText
              colorName="text.1"
              type="body"
              style={{
                textDecorationLine: checked ? "line-through" : "none",
                opacity: checked ? 0.5 : 1,
              }}
            >
              {item.name}
            </ThemedText>
            <View style={styles.footer}>
              <ThemedText colorName="text.3" type="body">
                {item.quantity || 1}
              </ThemedText>
              <ThemedText colorName="text.3" type="body">
                {item.value || 0}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
      </ReanimatedSwipeable>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
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
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginHorizontal: 24,
  },
  actionText: {
    color: "white",
    fontSize: 16,
  },
});
