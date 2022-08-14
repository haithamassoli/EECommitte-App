import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "@Screens/info";
import AboutUniScreen from "@Screens/info/aboutUni";
import ContactUsScreen from "@Screens/info/contactUs";
import QuickLinkesScreen from "@Screens/info/quickLinkes";
import SupportUsScreen from "@Screens/info/supportUs";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function InfoNavigation() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconColor = theme === "light" ? Colors.primary700 : Colors.primary400;
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingEnd: 10,
              }}
            >
              <Feather
                onPress={() => navigation.navigate("Search")}
                name="search"
                size={24}
                color={iconColor}
                style={{ paddingStart: 10 }}
              />
              {theme === "light" ? (
                <Feather
                  onPress={() => toggleTheme()}
                  name="moon"
                  size={24}
                  color={iconColor}
                />
              ) : (
                <Feather
                  onPress={() => toggleTheme()}
                  name="sun"
                  size={24}
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
        options={{ headerTitle: "عن الجامعة" }}
        name="AboutEECommitte"
        component={AboutUniScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "الدعم" }}
        name="SupportUs"
        component={SupportUsScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "تواصل معنا" }}
        name="ContactUs"
        component={ContactUsScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "روابط مهمة" }}
        name="QuickLinkes"
        component={QuickLinkesScreen}
      />
    </Stack.Navigator>
  );
}
