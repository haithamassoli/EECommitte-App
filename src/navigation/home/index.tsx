import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@Screens/home";
import AboutEEcommitteScreen from "@Screens/home/AboutEECommitte";
import AboutRegistrationScreen from "@Screens/home/AboutRegistration";
import CalculatorScreen from "@Screens/home/Calculator";
import WeeklyNotebooksScreen from "@Screens/home/WeeklyNotebooks";
import DoctorsScreen from "@Screens/home/doctors";
import SearchScreen from "@Screens/search";
import RecordsScreen from "@Screens/home/Records";
import OurExplanationsScreen from "@Screens/home/OurExplanations";
import FavoriteScreen from "@Screens/home/Favorite";
import FAQScreen from "@Screens/home/FAQ";
import RegestrationScreen from "@Screens/home/Regestration";

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
      <Stack.Screen name="Records" component={RecordsScreen} />
      <Stack.Screen name="OurExplanations" component={OurExplanationsScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="Regestration" component={RegestrationScreen} />
      <Stack.Screen
        name="Favorite"
        options={{
          headerTitle: "المفضلة",
        }}
        component={FavoriteScreen}
      />
    </Stack.Navigator>
  );
}
