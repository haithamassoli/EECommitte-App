import Colors from "@GlobalStyle/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "@Screens/home/search";
import InfoScreen from "@Screens/info";
import SupportUsScreen from "@Screens/info/supportUs";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { InfoStackParamList } from "@Types/navigation";
import { isIOS, moderateScale, vs } from "@Utils/Platform";
import { Shadow } from "react-native-shadow-2";
import DashboardScreen from "@Screens/info/dashboard";
import DashboardListScreen from "@Screens/info/dashboard/list";
import ManageFAQScreen from "@Screens/info/dashboard/manageFAQ";
import ManageCarouselScreen from "@Screens/info/dashboard/manageCarousel";
import ManageDoctorsScreen from "@Screens/info/dashboard/manageDoctors";
import ManageNotificationsScreen from "@Screens/info/dashboard/manageNotifications";
import ManageOurExplanationsScreen from "@Screens/info/dashboard/manageOurExplanations";
import ManageRecordsScreen from "@Screens/info/dashboard/manageRecords";
const Stack = createStackNavigator<InfoStackParamList>();

export default function InfoNavigation() {
  const { theme } = useContext(ThemeContext);
  const shadowColor =
    theme === "light" ? Colors.lightShadow : Colors.darkShadow;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: moderateScale(16),
          fontFamily: "Bukra",
          lineHeight: vs(28),
        },
        headerStyle: {
          height: isIOS ? vs(96) : vs(64),
        },
        headerBackTitle: "رجوع",
        headerBackTitleStyle: {
          fontSize: moderateScale(16),
          fontFamily: "Bukra",
        },
        headerMode: "screen",
        headerBackground() {
          return (
            <Shadow
              distance={12}
              startColor={shadowColor}
              endColor="rgba(0, 0, 0, 0)"
              sides={{
                top: false,
                bottom: true,
                end: false,
                start: false,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          );
        },
      }}
      initialRouteName="Info"
    >
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SupportUs" component={SupportUsScreen} />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "لوحة التحكم",
        }}
      />
      <Stack.Screen
        name="DashboardList"
        component={DashboardListScreen}
        options={{
          title: "لوحة التحكم",
        }}
      />
      <Stack.Screen
        name="ManageFAQ"
        component={ManageFAQScreen}
        options={{
          title: "إدارة الأسئلة الشائعة",
        }}
      />
      <Stack.Screen
        name="ManageCarousel"
        component={ManageCarouselScreen}
        options={{
          title: "إدارة صور الرئيسية",
        }}
      />
      <Stack.Screen
        name="ManageDoctors"
        component={ManageDoctorsScreen}
        options={{
          title: "إدارة الهيئة التدريسية",
        }}
      />
      <Stack.Screen
        name="ManageNotifications"
        component={ManageNotificationsScreen}
        options={{
          title: "إرسال الإشعارات",
        }}
      />
      <Stack.Screen
        name="ManageOurExplanations"
        component={ManageOurExplanationsScreen}
        options={{
          title: "إدارة أبرز الشروحات",
        }}
      />
      <Stack.Screen
        name="ManageRecords"
        component={ManageRecordsScreen}
        options={{
          title: "إدارة التسجيلات",
        }}
      />
    </Stack.Navigator>
  );
}
