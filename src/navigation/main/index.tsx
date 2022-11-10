import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SubjectsNavigation from "../subjects";
import { Feather } from "@expo/vector-icons";
import type { BottomTabParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@GlobalStyle/Navigation";
import InfoNavigation from "@Navigation/info";
import HomeNavigation from "@Navigation/home";
import {
  horizontalScale,
  isIOS,
  moderateScale,
  verticalScale,
} from "@Utils/Platform";
import { screenWidth } from "@Utils/Helper";
import { Shadow } from "react-native-shadow-2";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

export default function Route() {
  const { theme } = useContext(ThemeContext);
  const tabBarActiveTintColor =
    theme === "light" ? Colors.primary700 : Colors.primary400;
  const shadowColor =
    theme === "light" ? Colors.lightShadow : Colors.darkShadow;
  const tabBarBackground =
    theme === "light" ? Colors.lightBackground : Colors.darkBackground;
  return (
    <NavigationContainer
      theme={theme === "light" ? LightNavigationColors : DarkNavigationColors}
    >
      <BottomTabs.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor,
          tabBarIconStyle: {
            width: horizontalScale(24),
          },
          tabBarStyle: {
            minHeight: isIOS ? "8.4%" : "8%",
            backgroundColor: tabBarBackground,
          },
          tabBarLabelStyle: {
            fontSize: moderateScale(12),
            fontFamily: "TajawalBold",
            paddingBottom:
              screenWidth < 500 && isIOS
                ? 0
                : screenWidth < 500
                ? verticalScale(8)
                : 0,
          },
          headerTitleStyle: {
            fontSize: moderateScale(16),
            fontFamily: "Bukra",
          },
          tabBarBackground() {
            return (
              <Shadow
                style={{ width: "100%" }}
                distance={12}
                startColor={shadowColor}
                endColor="rgba(0, 0, 0, 0)"
                sides={{
                  top: true,
                  bottom: false,
                  end: false,
                  start: false,
                }}
              />
            );
          },
        }}
      >
        <>
          <BottomTabs.Screen
            name="HomeNavigation"
            component={HomeNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="home" size={moderateScale(24)} color={color} />
              ),
              tabBarLabel: "الرئيسية",
              headerShown: false,
            }}
          />
          <BottomTabs.Screen
            name="SubjectsNavigation"
            component={SubjectsNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather
                  name="share-2"
                  size={moderateScale(28)}
                  color={color}
                  style={{
                    transform: [
                      { rotate: "-30deg" },
                      { translateY: 3 },
                      { translateX: -3 },
                    ],
                  }}
                />
              ),
              headerShown: false,
              tabBarLabel: "ما يخص المواد",
            }}
          />
          <BottomTabs.Screen
            name="InfoNavigation"
            component={InfoNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="menu" size={moderateScale(24)} color={color} />
              ),
              headerShown: false,
              tabBarLabel: "المزيد",
            }}
          />
        </>
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
