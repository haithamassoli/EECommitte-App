import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "@Screens/info";
import AboutEECommitteScreen from "@Screens/info/aboutEECommitte";
import SupportUsScreen from "@Screens/info/supportUs";
import { moderateScale } from "@Utils/Platform";

const Stack = createStackNavigator();

export default function InfoNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: moderateScale(18),
          fontFamily: "Bukra",
        },
      }}
      initialRouteName="Info"
    >
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen
        options={{ headerTitle: "عن اللجنة" }}
        name="AboutEECommitte"
        component={AboutEECommitteScreen}
      />
      <Stack.Screen name="SupportUs" component={SupportUsScreen} />
    </Stack.Navigator>
  );
}
