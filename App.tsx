import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Route />
      </SafeAreaView>
    </>
  );
}