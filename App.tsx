import "react-native-gesture-handler";
import { useCallback, useEffect, useRef, useState } from "react";
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
import { ColorSchemeProvider, useColorScheme } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
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
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  const [isFirstTime, setIsFirstTime] = useState(false);
  const notificationListener = useRef();

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
    const firstTime = () => {
      const firstTime = getDataMMKV("firstTime");
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
      setNotificationsTokens(pushNotificationsToken.data);
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
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const addNotificationCount = () => {
          const count = getDataMMKV("notificationsCount");
          const notifications: any = getDataMMKV("notifications");
          if (notifications) {
            const newNotifications = [
              {
                title: notification.request.content.title,
                body: notification.request.content.body,
              },
              ...notifications,
            ];
            storeDataMMKV("notifications", newNotifications);
          } else {
            storeDataMMKV("notifications", [
              {
                title: notification.request.content.title,
                body: notification.request.content.body,
              },
            ]);
          }
          if (count != null) {
            storeDataMMKV("notificationsCount", count + 1);
          } else {
            storeDataMMKV("notificationsCount", 1);
          }
        };
        addNotificationCount();
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  const onFinished = useCallback(() => {
    setIsFirstTime(false);
    storeDataMMKV("firstTime", true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isFirstTime)
    return <FirstLoading onLayout={onLayoutRootView} onFinished={onFinished} />;

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ColorSchemeProvider>
          <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <MyApp />
          </SafeAreaView>
        </ColorSchemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const MyApp = () => {
  const { theme } = useColorScheme();

  const materialTheme: any = {
    ...MD3LightTheme,
    dark: theme === "dark",
    isV3: true,
    version: 3,
    colors:
      theme === "light"
        ? { ...MD3LightTheme.colors, ...MaterialLight }
        : { ...MD3LightTheme.colors, ...MaterialDark },
    fonts: configureFonts({ config: fontConfig }),
  };
  return (
    <FavoriteProvider>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        backgroundColor={
          theme === "light" ? Colors.lightBackground : Colors.darkBackground
        }
      />
      <PaperProvider theme={materialTheme}>
        <Route />
      </PaperProvider>
    </FavoriteProvider>
  );
};
