import { createStackNavigator } from '@react-navigation/stack';
// import CameraScreen from '../../screens/camera';
// import ProfileScreen from '../../screens/profile';
// import SearchScreen from '../../screens/search';
import FeedScreen from '../../screens/feed';
// import FeedNavigation from '../feed';
// import ChatScreen from '../../screens/chat/list';

const Stack = createStackNavigator();



export default function HomeScreen() {
    return (
        <Stack.Navigator
            // barStyle={{ backgroundColor: 'black' }}
            initialRouteName="Feed">
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen
                name="Discover"
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="search" size={24} color={color} />
                    )
                }}
            />
            <Stack.Screen
                name="Add"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="plus-square" size={24} color={color} />
                    )
                }}
            />
            <Stack.Screen
                name="Inbox"
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="message-square" size={24} color={color} />
                    )
                }}
            />
            <Stack.Screen
                name="Me"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    )
                }}
                initialParams={{ initialUserId: firebase.auth().currentUser.uid }}
            /> */}
        </Stack.Navigator>

    )
}