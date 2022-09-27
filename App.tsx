import "react-native-gesture-handler";
import { useCallback, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import { I18nManager, Platform, Text, UIManager } from "react-native";
import { reloadAsync } from "expo-updates";
import { ThemeContext, ThemeProvider } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const forceRTL = async () => {
      if (!I18nManager.isRTL) {
        try {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
          await reloadAsync();
        } catch (error) {
          console.log(error);
        }
      }
    };
    forceRTL();
    // @ts-ignore
    if (Text.defaultProps == null) {
      // @ts-ignore
      Text.defaultProps = {};
      // @ts-ignore
      Text.defaultProps.allowFontScaling = false;
    }
    const firstTime = async () => {
      const firstTime = await getDataFromStorage("firstTime");
      if (firstTime === null) {
        await storeDataToStorage("firstTime", true);
      }
    };
    firstTime();
  }, []);

  const [fontsLoaded] = useFonts({
    TajawalLight: require("./assets/fonts/Tajawal-Light.ttf"),
    TajawalMedium: require("./assets/fonts/Tajawal-Medium.ttf"),
    TajawalRegular: require("./assets/fonts/Tajawal-Regular.ttf"),
    TajawalBold: require("./assets/fonts/Tajawal-Bold.ttf"),
    Bukra: require("./assets/fonts/29ltbukra.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
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
      <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <Route />
      </SafeAreaView>
    </ThemeProvider>
  );
}
