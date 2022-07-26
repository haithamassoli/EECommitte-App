import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import {
  Platform,
  StyleSheet,
  StatusBar as reactNativeStatusBar,
} from "react-native";

export default function App() {
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
    paddingTop:
      Platform.OS === "android" ? -20 : 0,
    // paddingTop:
    //   Platform.OS === "android" ? 0 : 0,
  },
});
