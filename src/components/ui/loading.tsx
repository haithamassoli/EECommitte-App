import { ActivityIndicator } from "react-native";
import React from "react";
import Colors from "@GlobalStyle/Colors";
import { useColorScheme } from "@Src/store/themeContext";

interface LoadingProps {
  size?: "small" | "large";
}

const Loading = ({ size }: LoadingProps) => {
  const { theme } = useColorScheme();
  return (
    <ActivityIndicator
      style={{ flex: 1 }}
      size={size || "large"}
      color={theme === "light" ? Colors.primary700 : Colors.primary400}
    />
  );
};

export default Loading;