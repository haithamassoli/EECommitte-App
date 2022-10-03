import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";
import InfoScreen from "@Screens/info";
import AboutEECommitteScreen from "@Screens/info/aboutEECommitte";
import SupportUsScreen from "@Screens/info/supportUs";
import { ThemeContext } from "@Src/store/themeContext";
import { BottomTabParamList } from "@Types/navigation";
import { horizontalScale, moderateScale } from "@Utils/Platform";
import { useContext } from "react";
import { View } from "react-native";

const Stack = createStackNavigator();
type Props = StackScreenProps<BottomTabParamList, "InfoNavigation">;

export default function InfoNavigation({ navigation }: Props) {
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
        options={{
          headerTitle: "الدعم",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Feather
                name="arrow-right"
                size={24}
                color={iconColor}
                style={{ paddingHorizontal: 10 }}
                onPress={() => navigation.goBack()}
              />
              <Feather
                name="heart"
                size={24}
                color={iconColor}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        }}
        name="SupportUs"
        component={SupportUsScreen}
      />
    </Stack.Navigator>
  );
}
