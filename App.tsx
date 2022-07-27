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

export default function App() {
  useLayoutEffect(() => {
    // I18nManager.isRTL = true;
    // I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }, []);

  console.log(I18nManager.isRTL);
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
