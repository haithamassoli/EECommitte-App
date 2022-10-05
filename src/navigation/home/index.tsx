import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@Screens/home";
import CalculatorScreen from "@Screens/home/Calculator";
import DoctorsScreen from "@Screens/home/Doctors";
import SearchScreen from "@Screens/home/Search";
import RecordsScreen from "@Screens/home/Records";
import OurExplanationsScreen from "@Screens/home/OurExplanations";
import FavoriteScreen from "@Screens/home/Favorite";
import FAQScreen from "@Screens/home/FAQ";
import RegistrationScreen from "@Screens/home/Registration";
import NotificationScreen from "@Screens/home/Notification";
import SubjectNameScreen from "@Screens/home/SubjectName";
import { Feather } from "@expo/vector-icons";
import { horizontalScale, moderateScale } from "@Utils/Platform";
import { View, TouchableOpacity } from "react-native";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import Colors from "@GlobalStyle/Colors";
import { BottomTabParamList } from "@Types/navigation";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import CustomHeader from "@Components/ui/CustomHeader";

const Stack = createStackNavigator();
type Props = BottomTabScreenProps<BottomTabParamList, "HomeNavigation">;

export default function HomeNavigation({ navigation }: Props) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const iconColor = theme === "light" ? Colors.lightText : Colors.darkText;

  const clacIcon =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/calculator.png")
      : require("@Assets/images/icons/dark-icons/calculator.png");

  const docIcon =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/doctors.png")
      : require("@Assets/images/icons/dark-icons/doctors.png");
  const faqIcon =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/faq.png")
      : require("@Assets/images/icons/dark-icons/faq.png");
  const favIcon =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/fav.png")
      : require("@Assets/images/icons/dark-icons/fav.png");
  const ExpIcon =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/best.png")
      : require("@Assets/images/icons/dark-icons/best.png");
  const recIcon =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/records.png")
      : require("@Assets/images/icons/dark-icons/records.png");
  const regIcon =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/registration.png")
      : require("@Assets/images/icons/dark-icons/registration.png");

  return (
    <Stack.Navigator
      initialRouteName="Home"
      id="Home"
      key={"Home"}
      screenOptions={{
        headerTitleStyle: {
          fontSize: moderateScale(18),
          fontFamily: "Bukra",
        },
        headerRight: () => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                paddingEnd: horizontalScale(10),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Search");
                }}
              >
                <Feather
                  name="search"
                  size={moderateScale(24)}
                  color={iconColor}
                  style={{ paddingStart: horizontalScale(10) }}
                />
              </TouchableOpacity>
              {theme === "light" ? (
                <TouchableOpacity onPress={() => toggleTheme()}>
                  <Feather
                    name="moon"
                    size={moderateScale(24)}
                    color={iconColor}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => toggleTheme()}>
                  <Feather
                    name="sun"
                    size={moderateScale(24)}
                    color={iconColor}
                  />
                </TouchableOpacity>
              )}
            </View>
          );
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        options={{
          headerTitle: "الهيئة التدريسية",
          headerLeft: () => (
            <CustomHeader
              onPress={() => navigation.goBack()}
              iconColor={docIcon}
            />
          ),
        }}
        name="Doctors"
        component={DoctorsScreen}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          headerTitle: "حساب المعدل",
          headerLeft: () => (
            <CustomHeader
              onPress={() => navigation.goBack()}
              iconColor={clacIcon}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Records"
        options={{
          headerTitle: "تسجيلات اللجنة",
          headerLeft: () => (
            <CustomHeader
              onPress={() => navigation.goBack()}
              iconColor={recIcon}
            />
          ),
        }}
        component={RecordsScreen}
      />
      <Stack.Screen
        name="OurExplanations"
        options={{
          headerTitle: "أبرز شروحاتنا",
          headerLeft: () => (
            <CustomHeader
              onPress={() => navigation.goBack()}
              iconColor={ExpIcon}
            />
          ),
        }}
        component={OurExplanationsScreen}
      />
      <Stack.Screen
        name="FAQ"
        options={{
          headerTitle: "الأسئلة الشائعة",
          headerLeft: () => (
            <CustomHeader
              onPress={() => navigation.goBack()}
              iconColor={faqIcon}
            />
          ),
        }}
        component={FAQScreen}
      />
      <Stack.Screen
        name="Registration"
        options={{
          headerTitle: "ما يخص التسجيل",
          headerLeft: () => (
            <CustomHeader
              onPress={() => navigation.goBack()}
              iconColor={regIcon}
            />
          ),
        }}
        component={RegistrationScreen}
      />
      <Stack.Screen
        name="Notification"
        options={{
          headerTitle: "الإشعارات",
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Feather
                name="arrow-right"
                size={24}
                color={iconColor}
                style={{ paddingHorizontal: 10 }}
                onPress={() => navigation.goBack()}
              />
              <Feather
                name="bell"
                size={24}
                color={iconColor}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        }}
        component={NotificationScreen}
      />
      <Stack.Screen name="SubjectName" component={SubjectNameScreen} />
      <Stack.Screen
        name="Favorite"
        options={{
          headerTitle: "المفضلة",
          headerLeft: () => (
            <CustomHeader
              onPress={() => navigation.goBack()}
              iconColor={favIcon}
            />
          ),
        }}
        component={FavoriteScreen}
      />
    </Stack.Navigator>
  );
}
