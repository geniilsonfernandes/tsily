import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/database/useShoppingList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React, { memo, useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  BounceIn,
  FadeIn,
  FadeOutLeft,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const RightAction = ({ progress }: { progress: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5],
      ["white", "red"]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[styles.rightAction, animatedStyle]}>
      <Feather name="trash-2" size={18} color="white" />
    </Animated.View>
  );
};

export const ListItem = memo(
  ({
    item,
    onCheck,
    onDelete,
  }: {
    item: Product;
    onCheck: (id: string, checked: boolean) => void;
    onDelete: (id: string) => void;
  }) => {
    const [checked, setChecked] = useState(item.checked);
    const backgroundColor = useThemeColor({}, "background");
    const checkedColorBorder = useThemeColor({}, "success");
    const uncheckedColorBorder = useThemeColor({}, "text.7");

    const handleCheck = useCallback(() => {
      setChecked((prev) => !prev);
      onCheck(item.id, !checked);
    }, [checked, onCheck, item.id]);

    const handleSwipeToDelete = useCallback(() => {
      onDelete(item.id);
    }, [item.id, onDelete]);

    return (
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={100}
        onSwipeableWillOpen={handleSwipeToDelete}
        renderRightActions={(progress) => <RightAction progress={progress} />}
      >
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOutLeft.duration(300).delay(400)}
          style={[styles.container, { backgroundColor }]}
        >
          <Pressable
            style={[
              styles.check,
              checked
                ? {
                    borderColor: checkedColorBorder,
                    backgroundColor: checkedColorBorder,
                  }
                : { borderColor: uncheckedColorBorder },
            ]}
            onPress={handleCheck}
          >
            {checked ? (
              <Animated.View entering={BounceIn.duration(300)}>
                <Feather name="check" size={16} color="#fff" />
              </Animated.View>
            ) : (
              <Animated.View entering={FadeIn.duration(300)}>
                <Feather name="circle" size={16} color="#fff" />
              </Animated.View>
            )}
          </Pressable>
          <ThemedText
            colorName="text.1"
            type="body"
            style={{
              textDecorationLine: checked ? "line-through" : "none",
              opacity: checked ? 0.5 : 1,
              flex: 1,
            }}
          >
            {item.name}
          </ThemedText>
          <ThemedText colorName="text.3" type="body">
            {item.quantity || 1}
          </ThemedText>
          <ThemedText colorName="text.3" type="body">
            {item.value || 0}
          </ThemedText>
        </Animated.View>
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
  },
  check: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
  },
  rightAction: {
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
    alignItems: "flex-end",
    width: "100%",
    height: "100%",
  },
});
