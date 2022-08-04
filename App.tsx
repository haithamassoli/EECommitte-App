import "react-native-gesture-handler";
import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import { I18nManager, Platform } from "react-native";
import * as Updates from "expo-updates";
import { ThemeContext, ThemeProvider } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

import { useFonts } from "expo-font";

export default function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const forceRTL = async () => {
      if (!I18nManager.isRTL) {
        try {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
          await Updates.reloadAsync();
        } catch (error) {
          console.log(error);
        }
      }
    };
    forceRTL();
  }, []);

  const [loaded] = useFonts({
    TajawalLight: require("./assets/fonts/Tajawal-Light.ttf"),
    TajawalMedium: require("./assets/fonts/Tajawal-Medium.ttf"),
    TajawalRegular: require("./assets/fonts/Tajawal-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        backgroundColor={
          theme === "light" ? Colors.lightBackground : Colors.darkBackground
        }
      />
      <SafeAreaView style={{ flex: 1 }}>
        <Route />
      </SafeAreaView>
    </ThemeProvider>
  );
}
