import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SubjectsNavigation from "../subjects";
import { Feather } from "@expo/vector-icons";
import type { BottomTabParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { View } from "react-native";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@GlobalStyle/Navigation";
import InfoNavigation from "@Navigation/info";
import HomeNavigation from "@Navigation/home";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { screenWidth } from "@Utils/Helper";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

export default function Route() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const tabBarActiveTintColor =
    theme === "light" ? Colors.primary700 : Colors.primary400;
  const iconColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <NavigationContainer
      theme={theme === "light" ? LightNavigationColors : DarkNavigationColors}
    >
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor,
          tabBarInactiveTintColor: "#9b9b9b",
          tabBarIconStyle: {
            width: horizontalScale(24),
          },
          tabBarStyle: {
            height: verticalScale(64),
          },
          tabBarLabelStyle: {
            fontSize: moderateScale(12),
            fontFamily: "TajawalBold",
            marginBottom: screenWidth < 500 ? verticalScale(8) : 0,
          },
          headerTitleStyle: {
            fontSize: moderateScale(18),
            fontFamily: "Bukra",
          },
          headerRight: () => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingEnd: horizontalScale(10),
                }}
              >
                <Feather
                  onPress={() => navigation.navigate("Search")}
                  name="search"
                  size={moderateScale(24)}
                  color={iconColor}
                  style={{ paddingStart: horizontalScale(10) }}
                />
                {theme === "light" ? (
                  <Feather
                    onPress={() => toggleTheme()}
                    name="moon"
                    size={moderateScale(24)}
                    color={iconColor}
                  />
                ) : (
                  <Feather
                    onPress={() => toggleTheme()}
                    name="sun"
                    size={moderateScale(24)}
                    color={iconColor}
                  />
                )}
              </View>
            );
          },
        })}
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
                <Feather name="map" size={moderateScale(24)} color={color} />
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
