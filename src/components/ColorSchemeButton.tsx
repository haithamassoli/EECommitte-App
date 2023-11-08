import React, { useContext } from "react";
import Feather from "@expo/vector-icons/Feather";
import { ms } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { TouchableOpacity } from "react-native";
import switchTheme from "react-native-theme-switch-animation";

export const ColorSchemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      onPress={(e) => {
        e.currentTarget.measure(
          (
            x1: number,
            y1: number,
            width: number,
            height: number,
            px: number,
            py: number
          ) => {
            switchTheme({
              switchThemeFunction: () => {
                toggleTheme();
              },
              animationConfig: {
                type: "circular",
                duration: 900,
                startingPoint: {
                  cy: py + height / 2,
                  cx: px + width / 2,
                },
              },
            });
          }
        );
      }}
    >
      <Feather
        name={theme === "light" ? "moon" : "sun"}
        color={theme === "light" ? Colors.lightText : Colors.darkText}
        size={ms(24)}
      />
    </TouchableOpacity>
  );
};
