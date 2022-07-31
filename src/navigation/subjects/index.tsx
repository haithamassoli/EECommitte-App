import { createStackNavigator } from "@react-navigation/stack";
import PlanScreen from "../../screens/plan";
import SubjectScreen from "../../screens/subject";

const Stack = createStackNavigator();

export default function SubjectsNavigation() {
  return (
    <Stack.Navigator
      // barStyle={{ backgroundColor: 'black' }}
      initialRouteName="Plan"
    >
      <Stack.Screen
        name="Plan"
        component={PlanScreen}
        options={{
          headerTitle: "الخطة الشجرية",
        }}
      />
      <Stack.Screen name="Subject" component={SubjectScreen} />
    </Stack.Navigator>
  );
}
