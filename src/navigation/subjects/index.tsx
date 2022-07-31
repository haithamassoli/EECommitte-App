import { createStackNavigator } from "@react-navigation/stack";
import PlanScreen from "../../screens/subjects/plan";
import SubjectScreen from "../../screens/subjects/subject";
import SubjectFullPostScreen from "../../screens/subjects/subjectFullPost";
import SubjectWebViewScreen from "../../screens/subjects/subjectWebView";

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
      <Stack.Screen name="SubjectWebView" component={SubjectWebViewScreen} />
      <Stack.Screen name="SubjectFullPost" component={SubjectFullPostScreen} />
    </Stack.Navigator>
  );
}
