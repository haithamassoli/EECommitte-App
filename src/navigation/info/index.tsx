import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "@Screens/info";
import AboutEECommitteScreen from "@Screens/info/aboutEECommitte";
import SupportUsScreen from "@Screens/info/supportUs";
import { ThemeContext } from "@Src/store/themeContext";
import { horizontalScale, moderateScale } from "@Utils/Platform";
import { useContext } from "react";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function InfoNavigation() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
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
      initialRouteName="Info"
    >
      <Stack.Screen
        options={{ headerTitle: "القائمة" }}
        name="Info"
        component={InfoScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "عن اللجنة" }}
        name="AboutEECommitte"
        component={AboutEECommitteScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "الدعم" }}
        name="SupportUs"
        component={SupportUsScreen}
      />
    </Stack.Navigator>
  );
}
