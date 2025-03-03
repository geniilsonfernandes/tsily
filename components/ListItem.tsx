import { ThemedText } from "@/components/ThemedText";
import {
  Product as ProductType,
  useShoppingList,
} from "@/database/useShoppingList";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  BounceIn,
  FadeIn,
  SharedValue,
} from "react-native-reanimated";
import { ThemedView } from "./ThemedView";

const RightAction = ({ progress }: { progress: SharedValue<number> }) => {
  return (
    <ThemedView backgroundColor="danger" style={[styles.rightAction]}>
      <Feather name="trash-2" size={18} color="white" />
    </ThemedView>
  );
};

type ProductProps = {
  invalidateList?: () => void;
} & ProductType;

export const Product: React.FC<ProductProps> = React.memo(
  ({ id, name, quantity, checked, value, invalidateList }) => {
    const shoppingList = useShoppingList();
    const [isChecked, setIsChecked] = React.useState(checked);

    const checkedColorBorder = useThemeColor({}, "success");
    const uncheckedColorBorder = useThemeColor({}, "text.7");

    const handleCheck = useCallback(async () => {
      await shoppingList.checkProduct({ id, checked: !isChecked });
      setIsChecked(!isChecked);
    }, [id, isChecked]);

    const handleSwipeToDelete = useCallback(async () => {
      await shoppingList.deleteProduct(id);
      invalidateList && invalidateList();
    }, [id]);

    return (
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={100}
        overshootLeft={true}
        renderLeftActions={() => null}
        onSwipeableWillOpen={handleSwipeToDelete}
        renderRightActions={(progress) => <RightAction progress={progress} />}
      >
        <ThemedView backgroundColor="background" style={styles.container}>
          <Pressable
            style={[
              styles.check,
              isChecked
                ? {
                    borderColor: checkedColorBorder,
                    backgroundColor: checkedColorBorder,
                  }
                : { borderColor: uncheckedColorBorder },
            ]}
            onPress={handleCheck}
          >
            {isChecked ? (
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
              textDecorationLine: isChecked ? "line-through" : "none",
              opacity: isChecked ? 0.5 : 1,
              flex: 1,
            }}
          >
            {name}
          </ThemedText>
          <ThemedText colorName="text.3" type="body">
            {quantity || 1}
          </ThemedText>
          <ThemedText colorName="text.3" type="body">
            {value || 0}
          </ThemedText>
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
    paddingRight: 8,
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
