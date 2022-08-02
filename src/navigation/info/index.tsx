import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "@Screens/info";
import AboutUniScreen from "@Screens/info/aboutUni";
import ContactUsScreen from "@Screens/info/contactUs";
import DoctorsScreen from "@Screens/info/doctors";
import QuickLinkesScreen from "@Screens/info/quickLinkes";
import SupportUsScreen from "@Screens/info/supportUs";

const Stack = createStackNavigator();

export default function InfoNavigation() {
  return (
    <Stack.Navigator initialRouteName="Info">
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
        options={{ headerTitle: "قائمة المعلمين" }}
        name="Doctors"
        component={DoctorsScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "روابط مهمة" }}
        name="QuickLinkes"
        component={QuickLinkesScreen}
      />
    </Stack.Navigator>
  );
}
