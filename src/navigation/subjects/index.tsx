import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import PlanScreen from "@Screens/subjects/plan";
import SubjectScreen from "@Screens/subjects/subject";
import SubjectFullPostScreen from "@Screens/subjects/subjectFullPost";
import SubjectWebViewScreen from "@Screens/subjects/subjectWebView";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { View } from "react-native";

const Stack = createStackNavigator();

export default function SubjectsNavigation() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconColor = theme === "light" ? Colors.primary700 : Colors.primary400;

  return (
    <Stack.Navigator
      initialRouteName="Plan"
      screenOptions={({ navigation }) => ({
        headerTitle: "الخطة الدراسية",
        headerRight: () => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingEnd: 10,
              }}
            >
              <Feather
                onPress={() => navigation.navigate("Search")}
                name="search"
                size={24}
                color={iconColor}
                style={{ paddingStart: 10 }}
              />
              {theme === "light" ? (
                <Feather
                  onPress={() => toggleTheme()}
                  name="moon"
                  size={24}
                  color={iconColor}
                />
              ) : (
                <Feather
                  onPress={() => toggleTheme()}
                  name="sun"
                  size={24}
                  color={iconColor}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Stack.Screen name="Plan" component={PlanScreen} />
      <Stack.Screen name="Subject" component={SubjectScreen} />
      <Stack.Screen name="SubjectWebView" component={SubjectWebViewScreen} />
      <Stack.Screen name="SubjectFullPost" component={SubjectFullPostScreen} />
    </Stack.Navigator>
  );
}
