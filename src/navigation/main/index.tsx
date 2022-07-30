import {
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
// import AuthScreen from '../../screens/auth'
import HomeScreen from "../home";
import SearchScreen from "../../screens/search";
import PlanScreen from "../../screens/plan";
import SubjectsScreen from "../subjects";
import type { BottomTabParamList } from "../../types/navigation";
// import SavePostScreen from '../../screens/savePost';
// import EditProfileScreen from '../../screens/profile/edit';
// import EditProfileFieldScreen from '../../screens/profile/edit/field';
// import Modal from '../../components/modal';
// import ProfileScreen from '../../screens/profile';
// import FeedScreen from '../../screens/feed';
// import ChatSingleScreen from '../../screens/chat/single';
// export type BottomTabParamList = {
// Home: NavigatorScreenParams<RootStackParamList> | undefined;
// AllCities: undefined;
// Search: undefined;
// Favorite: undefined;
// Register: undefined;
// Login: { register: string };
// };

// export type RootStackParamList = {
// ResturantsCity: { id: number; city: string };
// ResturantMeals: { resturantId: number; cityId: number };
// Meal: {
//   mealId: number;
//   cityId: number;
//   resturantId: number;
// };
// };

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();
// const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

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
            name="Subjects"
            component={SubjectsScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="map" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
          <BottomTabs.Screen
            name="Bars"
            component={PlanScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="menu" size={24} color={color} />
              ),
              headerTitle: "",
            }}
          />
          <BottomTabs.Screen
            name="Info"
            component={PlanScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="info" size={24} color={color} />
              ),
              headerTitle: "المعلومات",
            }}
          />
          {/* <BottomTabs.Screen
            name="editProfileField"
            component={EditProfileFieldScreen}
            options={{ headerShown: false }}
          />
          <BottomTabs.Screen
            name="chatSingle"
            component={ChatSingleScreen}
            options={{ headerShown: false }}
          /> */}
        </>
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}
