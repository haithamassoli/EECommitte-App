import Colors from "@GlobalStyle/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "@Screens/home/Search";
import InfoScreen from "@Screens/info";
import AboutEECommitteScreen from "@Screens/info/aboutEECommitte";
import SupportUsScreen from "@Screens/info/supportUs";
import { ThemeContext } from "@Src/store/themeContext";
import { InfoStackParamList } from "@Types/navigation";
import { moderateScale } from "@Utils/Platform";
import { Shadow } from "react-native-shadow-2";
import { useContext } from "react";
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
      <Stack.Screen
        options={{ headerTitle: "عن اللجنة" }}
        name="AboutEECommitte"
        component={AboutEECommitteScreen}
      />
      <Stack.Screen name="SupportUs" component={SupportUsScreen} />
    </Stack.Navigator>
  );
}
