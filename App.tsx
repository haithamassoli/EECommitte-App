import "react-native-gesture-handler";
import { useCallback, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import {
  I18nManager,
  Platform,
  Text,
  UIManager,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { reloadAsync } from "expo-updates";
import { ThemeContext, ThemeProvider } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  deleteAllStorage,
  getDataFromStorage,
  storeDataToStorage,
} from "@Utils/Helper";
import { FavoriteProvider } from "@Src/store/favoriteContext";
import { setNotificationsTokens } from "@Src/api/setNotificationsTokens";
import FirstLoading from "@Components/FirstLoading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import {
  PaperProvider,
  configureFonts,
  MD3LightTheme,
} from "react-native-paper";
import { fontConfig, MaterialDark, MaterialLight } from "@GlobalStyle/material";

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
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

ScrollView.defaultProps = ScrollView.defaultProps || {};
ScrollView.defaultProps.showsVerticalScrollIndicator = false;
ScrollView.defaultProps.showsHorizontalScrollIndicator = false;

FlashList.defaultProps = FlashList.defaultProps || {};
FlashList.defaultProps.showsVerticalScrollIndicator = false;
FlashList.defaultProps.showsHorizontalScrollIndicator = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
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
    const firstTime = async () => {
      const firstTime = await getDataFromStorage("firstTime");
      if (firstTime === null) {
        setIsFirstTime(true);
      }
    };
    firstTime();
    // deleteAllStorage();
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
        Alert.alert(
          "الصلاحيات مطلوبة",
          "يجب السماح بالإشعارات لتتمكن من استلامها"
        );
        return;
      }
      const pushNotificationsToken = await Notifications.getExpoPushTokenAsync({
        projectId: "17a53ebd-120e-477f-9b48-e87d75fd1a78",
      });
      // setNotificationsTokens(pushNotificationsToken.data);
      // console.log(pushNotificationsToken.data);

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

  if (!fontsLoaded) null;

  const materialTheme: any = {
    ...MD3LightTheme,
    dark: theme === "dark",
    isV3: true,
    version: 3,
    colors:
      theme === "dark"
        ? { ...MD3LightTheme.colors, ...MaterialDark }
        : { ...MD3LightTheme.colors, ...MaterialLight },
    fonts: configureFonts({ config: fontConfig }),
  };

  if (isFirstTime)
    <FirstLoading onLayout={onLayoutRootView} onFinished={onFinished} />;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <ThemeProvider>
          <FavoriteProvider>
            <StatusBar
              style={theme === "light" ? "dark" : "light"}
              backgroundColor={
                theme === "light"
                  ? Colors.lightBackground
                  : Colors.darkBackground
              }
            />
            <PaperProvider theme={materialTheme}>
              <Route />
            </PaperProvider>
          </FavoriteProvider>
        </ThemeProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
