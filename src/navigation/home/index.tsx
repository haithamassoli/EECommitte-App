import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@Screens/home";
import AboutEEcommitteScreen from "@Screens/home/AboutEECommitte";
import AboutRegistrationScreen from "@Screens/home/AboutRegistration";
import CalculatorScreen from "@Screens/home/Calculator";
import WeeklyNotebooksScreen from "@Screens/home/WeeklyNotebooks";
import DoctorsScreen from "@Screens/home/doctors";
import SearchScreen from "@Screens/search";

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        options={{ headerTitle: "عن الجامعة" }}
        name="AboutEECommitte"
        component={AboutEEcommitteScreen}
      />
      <Stack.Screen
        name="AboutRegistration"
        component={AboutRegistrationScreen}
      />
      <Stack.Screen
        options={{ headerTitle: "الكادر التدريسي" }}
        name="Doctors"
        component={DoctorsScreen}
      />
      <Stack.Screen name="WeeklyNotebooks" component={WeeklyNotebooksScreen} />
      <Stack.Screen
        options={{
          headerTitle: "البحث",
        }}
        name="Search"
        component={SearchScreen}
      />
      <Stack.Screen name="Calculator" component={CalculatorScreen} />
    </Stack.Navigator>
  );
}
