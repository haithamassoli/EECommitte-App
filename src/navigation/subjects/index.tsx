import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "@Screens/home/Search";
import PlanScreen from "@Screens/subjects/plan";
import SubjectScreen from "@Screens/subjects/subject";
import SubjectFullPostScreen from "@Screens/subjects/subjectFullPost";
import { SubjectsStackParamList } from "@Types/navigation";
import { moderateScale } from "@Utils/Platform";

const Stack = createStackNavigator<SubjectsStackParamList>();

export default function SubjectsNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Plan"
      screenOptions={{
        headerTitle: "ما يخص المواد",
        headerTitleStyle: {
          fontSize: moderateScale(18),
          fontFamily: "Bukra",
        },
      }}
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Plan" component={PlanScreen} />
      <Stack.Screen name="Subject" component={SubjectScreen} />
      <Stack.Screen name="SubjectFullPost" component={SubjectFullPostScreen} />
    </Stack.Navigator>
  );
}
