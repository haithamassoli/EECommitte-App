import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import AuthScreen from '../../screens/auth'
import HomeScreen from '../home';
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

const BottomTabs = createBottomTabNavigator();
// const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

export default function Route() {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator>
        <>
          <BottomTabs.Screen
            name="home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          {/* <BottomTabs.Screen
            name="savePost"
            component={SavePostScreen}
            options={{ headerShown: false }}
          />
          <BottomTabs.Screen
            name="userPosts"
            component={FeedScreen}
            options={{ headerShown: false }}
          />
          <BottomTabs.Screen
            name="profileOther"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <BottomTabs.Screen
            name="editProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
          <BottomTabs.Screen
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
