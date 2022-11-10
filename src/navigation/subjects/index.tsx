import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "@Screens/home/Search";
import PlanScreen from "@Screens/subjects/plan";
import SubjectScreen from "@Screens/subjects/subject";
import SubjectFullPostScreen from "@Screens/subjects/subjectFullPost";
import { ThemeContext } from "@Src/store/themeContext";
import { SubjectsStackParamList } from "@Types/navigation";
import { moderateScale } from "@Utils/Platform";
import { Shadow } from "react-native-shadow-2";
import { useContext } from "react";
import Colors from "@GlobalStyle/Colors";
const Stack = createStackNavigator<SubjectsStackParamList>();

export default function SubjectsNavigation() {
  const { theme } = useContext(ThemeContext);
  const shadowColor =
    theme === "light" ? Colors.lightShadow : Colors.darkShadow;
  return (
    <Stack.Navigator
      initialRouteName="Plan"
      screenOptions={{
        headerTitle: "ما يخص المواد",
        headerTitleStyle: {
          fontSize: moderateScale(16),
          fontFamily: "Bukra",
        },
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
    >
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Plan" component={PlanScreen} />
      <Stack.Screen name="Subject" component={SubjectScreen} />
      <Stack.Screen name="SubjectFullPost" component={SubjectFullPostScreen} />
    </Stack.Navigator>
  );
}
