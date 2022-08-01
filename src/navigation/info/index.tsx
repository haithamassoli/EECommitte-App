import { createStackNavigator } from '@react-navigation/stack';
import InfoScreen from '@Screens/info';

const Stack = createStackNavigator();

export default function InfoNavigation() {
    return (
        <Stack.Navigator
            // barStyle={{ backgroundColor: 'black' }}
            initialRouteName="Info">
            <Stack.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>

    )
}