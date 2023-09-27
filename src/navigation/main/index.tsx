import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SubjectsNavigation from "../subjects";
import { Feather } from "@expo/vector-icons";
import type { BottomTabParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useEffect, useState } from "react";
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
import { Shadow } from "react-native-shadow-2";
import { Animated, View } from "react-native";
import { screenWidth } from "@Utils/Helper";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();
export default function Route() {
  const { theme } = useContext(ThemeContext);

  const [labelYPositionTab1] = useState(new Animated.Value(40));
  const [labelYPositionTab2] = useState(new Animated.Value(40));
  const [labelYPositionTab3] = useState(new Animated.Value(40));

  useEffect(() => {
    Animated.spring(labelYPositionTab1, {
      toValue: 0,
      delay: 600,
      velocity: 0.1,
      speed: 0.1,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
    Animated.spring(labelYPositionTab2, {
      toValue: 0,
      delay: 800,
      velocity: 0.1,
      speed: 0.1,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
    Animated.spring(labelYPositionTab3, {
      toValue: 0,
      delay: 1000,
      velocity: 0.1,
      speed: 0.1,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  }, []);
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
            minHeight: isIOS ? "8.8%" : "8.2%",
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
                containerStyle={{
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    theme === "light"
                      ? Colors.lightBackground
                      : Colors.darkBackground,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor:
                    theme === "light"
                      ? Colors.lightBackground
                      : Colors.darkBackground,
                }}
                distance={10}
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
              tabBarLabel: ({ color }) => (
                <Animated.Text
                  style={{
                    color,
                    transform: [{ translateY: labelYPositionTab1 }],
                    fontSize: moderateScale(12),
                    fontFamily: "TajawalBold",
                    paddingBottom:
                      screenWidth < 500 && isIOS
                        ? 0
                        : screenWidth < 500
                        ? verticalScale(8)
                        : 0,
                  }}
                >
                  الرئيسية
                </Animated.Text>
              ),
              headerShown: false,
            }}
          />
          <BottomTabs.Screen
            name="SubjectsNavigation"
            component={SubjectsNavigation}
            options={{
              tabBarLabel: ({ color }) => (
                <Animated.Text
                  style={{
                    color,
                    transform: [{ translateY: labelYPositionTab2 }],
                    textAlign: "center",
                    fontSize: moderateScale(12),
                    fontFamily: "TajawalBold",
                    paddingBottom:
                      screenWidth < 500 && isIOS
                        ? 0
                        : screenWidth < 500
                        ? verticalScale(8)
                        : 0,
                  }}
                >
                  ما يخص المواد
                </Animated.Text>
              ),
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
            }}
          />
          <BottomTabs.Screen
            name="InfoNavigation"
            component={InfoNavigation}
            options={{
              tabBarLabel: ({ color }) => (
                <Animated.Text
                  style={{
                    color,
                    transform: [{ translateY: labelYPositionTab3 }],
                    fontSize: moderateScale(12),
                    fontFamily: "TajawalBold",
                    paddingBottom:
                      screenWidth < 500 && isIOS
                        ? 0
                        : screenWidth < 500
                        ? verticalScale(8)
                        : 0,
                  }}
                >
                  المزيد
                </Animated.Text>
              ),
              tabBarIcon: ({ color }) => (
                <Feather name="menu" size={moderateScale(24)} color={color} />
              ),
              headerShown: false,
            }}
          />
        </>
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
