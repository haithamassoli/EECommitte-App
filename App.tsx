import "react-native-gesture-handler";
import { useCallback, useContext, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import { I18nManager, Platform, Text, UIManager, Alert } from "react-native";
import { reloadAsync } from "expo-updates";
import { ThemeContext, ThemeProvider } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { FavoriteProvider } from "@Src/store/favoriteContext";
import { setNotificationsTokens } from "@Src/api/setNotificationsTokens";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

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

  useEffect(() => {
    const configurePushNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("التنبيهات معطلة", "يجب تفعيل التنبيهات لتتمكن من تلقيها", [
          {
            text: "الغاء",
            style: "cancel",
          },
          {
            text: "تفعيل",
            onPress: () => configurePushNotifications(),
          },
        ]);
        return;
      }
      const pushNotificationsToken =
        await Notifications.getExpoPushTokenAsync();
      setNotificationsTokens(pushNotificationsToken.data);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }
    };
    configurePushNotifications();
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
      <FavoriteProvider>
        <StatusBar
          style={theme === "light" ? "dark" : "light"}
          backgroundColor={
            theme === "light" ? Colors.lightBackground : Colors.darkBackground
          }
        />
        <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <Route />
        </SafeAreaView>
      </FavoriteProvider>
    </ThemeProvider>
  );
}
