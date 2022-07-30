import "react-native-gesture-handler";
import { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import {
  Platform,
  StyleSheet,
  I18nManager,
  StatusBar as reactNativeStatusBar,
} from "react-native";
// import { useFonts } from "expo-font";

export default function App() {
  useLayoutEffect(() => {
    // I18nManager.isRTL = true;
    // I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  // const [loaded] = useFonts({
  //   Montserrat: require('./assets/fonts/Montserrat.ttf'),
  // });
  
  // if (!loaded) {
  //   return null;
  // }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeAreaView}>
        <Route />
      </SafeAreaView>
    </>
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
