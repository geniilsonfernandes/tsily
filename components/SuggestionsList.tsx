import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Animated, { Easing, FadeIn, FadeInUp } from "react-native-reanimated";
import { Chip } from "./Chip";

export const SuggestionsList = ({ data }: { data: string[] }) => {
  const [mode, setMode] = useState<"horizontal" | "vertical">("horizontal");
  const iconColor = useThemeColor({}, "text.3");

  if (data.length === 0) {
    return null;
  }

  return (
    <View style={{ gap: 8 }}>
      <Pressable
        
        style={({ pressed }) => [styles.button]}
      >
        <Feather
          name={mode !== "horizontal" ? "chevron-down" : "chevron-up"}
          size={16}
          color={iconColor}
        />
      </Pressable>
      {mode === "vertical" && (
        <ScrollView
          style={{
            marginBottom: 8,
            maxHeight: 200,
          }}

        >
          <Animated.View
            entering={FadeInUp.duration(300).easing(Easing.inOut(Easing.quad))}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 4,
              marginBottom: 8,
        
            }}
          >
            {data.map((item, index) => (
              <Animated.View
                key={item}
                entering={FadeIn.delay(index * 10)
                  .duration(300)
                  .easing(Easing.inOut(Easing.quad))}
              >
                <Chip label={item} />
              </Animated.View>
            ))}
          </Animated.View>
        </ScrollView>
      )}
      {mode === "horizontal" && (
        <Animated.FlatList
          entering={FadeInUp.duration(300).easing(Easing.inOut(Easing.quad))}
          style={{
            marginBottom: 8,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          data={data}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeIn.delay(index * 10)
                .duration(300)
                .easing(Easing.inOut(Easing.quad))}
            >
              <Chip label={item} />
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {

    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    marginHorizontal: "auto",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
