import { createStackNavigator } from '@react-navigation/stack';
import InfoScreen from '@Screens/info';
import AboutUniScreen from '@Screens/info/aboutUni';
import ContactUsScreen from '@Screens/info/contactUs';
import DoctorsScreen from '@Screens/info/doctors';
import QuickLinkesScreen from '@Screens/info/quickLinkes';
import SupportUsScreen from '@Screens/info/supportUs';

const Stack = createStackNavigator();

export default function InfoNavigation() {
    return (
        <Stack.Navigator
            initialRouteName="Info">
            <Stack.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AboutUni"
                component={AboutUniScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SupportUs"
                component={SupportUsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ContactUs"
                component={ContactUsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Doctors"
                component={DoctorsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="QuickLinkes"
                component={QuickLinkesScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>

    )
}