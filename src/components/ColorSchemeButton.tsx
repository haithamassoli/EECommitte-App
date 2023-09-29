import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { ms } from "@Utils/Platform";
import { useColorScheme } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { TouchableOpacity } from "react-native";

export const ColorSchemeButton = () => {
  const { toggle, theme, active } = useColorScheme();
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart((e) => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });
  return (
    <GestureDetector gesture={tap}>
      <Feather
        name={theme === "light" ? "moon" : "sun"}
        color={theme === "light" ? Colors.lightText : Colors.darkText}
        size={ms(24)}
      />
    </GestureDetector>
  );
};
