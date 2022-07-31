import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SubjectsNavigation from "../subjects";
import InfoNavigation from "../../screens/info";
import SearchScreen from "../../screens/search";
import HomeScreen from "../../screens/home";
import { Feather } from "@expo/vector-icons";
import type { BottomTabParamList } from "../../types/navigation";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

export default function Route() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator>
        <>
          <BottomTabs.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="home" size={24} color={color} />
              ),
              headerShown: false,
              headerTitle: "الصفحة الرئيسية",
            }}
          />
          <BottomTabs.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="search" size={24} color={color} />
              ),
              headerTitle: "البحث",
            }}
          />
          <BottomTabs.Screen
            name="SubjectsNavigation"
            component={SubjectsNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="map" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
          <BottomTabs.Screen
            name="InfoNavigation"
            component={InfoNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="menu" size={24} color={color} />
              ),
              headerTitle: "Info",
            }}
          />
        </>
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
