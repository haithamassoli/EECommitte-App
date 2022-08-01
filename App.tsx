import "react-native-gesture-handler";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import {
  Platform,
  StyleSheet,
  I18nManager,
  StatusBar as reactNativeStatusBar,
} from "react-native";
import * as Updates from "expo-updates";
import { ThemeProvider } from "@Src/store/themeContext";

// import { useFonts } from "expo-font";

export default function App() {
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

  // const [loaded] = useFonts({
  //   Montserrat: require('./assets/fonts/Montserrat.ttf'),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeAreaView}>
        <Route />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? -20 : 0,
    // paddingTop:
    //   Platform.OS === "android" ? 0 : 0,
  },
});
