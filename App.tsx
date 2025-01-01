import "react-native-gesture-handler";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Route from "./src/navigation/main";
import {
  Platform,
  Text,
  UIManager,
  Alert,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import * as Updates from "expo-updates";
import { ThemeContext, ThemeProvider } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import { FavoriteProvider } from "@Src/store/favoriteContext";
import { setNotificationsTokens } from "@Src/api/setNotificationsTokens";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import {
  PaperProvider,
  configureFonts,
  MD3LightTheme,
} from "react-native-paper";
import { fontConfig, MaterialDark, MaterialLight } from "@GlobalStyle/material";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PasswordProvider } from "@Src/store/passwordContext";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const onFetchUpdateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
    }
  } catch (error) {
    // You can also add an alert() to see the error message in case of an error when fetching updates.
    console.log(`Error fetching latest Expo update: ${error}`);
  }
};

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
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;

// @ts-ignore
ScrollView.defaultProps = ScrollView.defaultProps || {};
// @ts-ignore
ScrollView.defaultProps.keyboardShouldPersistTaps = "handled";
// @ts-ignore
ScrollView.defaultProps.showsVerticalScrollIndicator = false;
// @ts-ignore
ScrollView.defaultProps.showsHorizontalScrollIndicator = false;

FlashList.defaultProps = FlashList.defaultProps || {};
// @ts-ignore
FlashList.defaultProps.showsVerticalScrollIndicator = false;
// @ts-ignore
FlashList.defaultProps.showsHorizontalScrollIndicator = false;
// @ts-ignore
FlashList.defaultProps.keyboardShouldPersistTaps = "handled";
// @ts-ignore
FlatList.defaultProps = FlatList.defaultProps || {};
// @ts-ignore
FlatList.defaultProps.showsVerticalScrollIndicator = false;
// @ts-ignore
FlatList.defaultProps.showsHorizontalScrollIndicator = false;
// @ts-ignore
FlatList.defaultProps.keyboardShouldPersistTaps = "handled";
// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;

export default function App() {
  const responseListener = useRef();

  useEffect(() => {
    onFetchUpdateAsync();
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
    // @ts-ignore
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        const addNotificationCount = () => {
          const count = getDataMMKV("notificationsCount");
          const notifications: any = getDataMMKV("notifications");
          if (notifications) {
            const newNotifications = [
              {
                title: notification.notification.request.content.title,
                body: notification.notification.request.content.body,
                link: notification.notification.request.content.data.link,
                date: new Date(),
              },
              ...notifications,
            ];
            storeDataMMKV("notifications", newNotifications);
          } else {
            storeDataMMKV("notifications", [
              {
                title: notification.notification.request.content.title,
                body: notification.notification.request.content.body,
                link: notification.notification.request.content.data.link,
                date: new Date(),
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
      // @ts-ignore
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <MyApp />
          </SafeAreaView>
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const MyApp = () => {
  const { theme } = useContext(ThemeContext);

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
    <PasswordProvider>
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
    </PasswordProvider>
  );
};
