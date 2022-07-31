import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../../screens/feed';

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
        </Stack.Navigator>
    )
}