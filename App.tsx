import "react-native-gesture-handler";
import { useCallback, useContext, useEffect, useState } from "react";
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
import FirstLoading from "@Components/FirstLoading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import mobileAds from "react-native-google-mobile-ads";

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    // Initialization complete!
  });
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  },
});

export default function App() {
  const { theme } = useContext(ThemeContext);
  const [isFirstTime, setIsFirstTime] = useState(false);
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
        setIsFirstTime(true);
      }
    };
    firstTime();
  }, []);

  const [fontsLoaded] = useFonts({
    TajawalMedium: require("./assets/fonts/Tajawal-Medium.ttf"),
    TajawalBold: require("./assets/fonts/Tajawal-Bold.ttf"),
    Bukra: require("./assets/fonts/29ltbukra.ttf"),
    Dubai: require("./assets/fonts/dubai.ttf"),
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
      console.log(pushNotificationsToken.data);

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

  const onFinished = useCallback(async () => {
    setIsFirstTime(false);
    await storeDataToStorage("firstTime", true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isFirstTime) {
    return <FirstLoading onLayout={onLayoutRootView} onFinished={onFinished} />;
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
          <QueryClientProvider client={queryClient}>
            <Route />
          </QueryClientProvider>
        </SafeAreaView>
      </FavoriteProvider>
    </ThemeProvider>
  );
}
