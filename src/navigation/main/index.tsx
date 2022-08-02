import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import SubjectsNavigation from "../subjects";
import SearchScreen from "@Screens/search";
import HomeScreen from "@Screens/home";
import { Feather } from "@expo/vector-icons";
import type { BottomTabParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@GlobalStyle/Navigation";
import InfoNavigation from "@Navigation/info";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

export default function Route() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <NavigationContainer
      theme={theme === "light" ? LightNavigationColors : DarkNavigationColors}
    >
      <BottomTabs.Navigator
        // tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={({ navigation }) => ({
          tabBarShowLabel: false,
          tabBarIconStyle: {
            // color: Colors.primary400,
          },
          tabBarActiveTintColor: "#e7a300",
          tabBarInactiveTintColor: "#9b9b9b",
          // tabBarItemStyle: {
          //   backgroundColor: "#eee",
          // },
          tabBarStyle: {
            height: 65,
            shadowColor: "transparent",
            // backgroundColor: "#f9ffa1",
            // marginBottom: 20,
            // width: "90%",
            // paddingVertical: 10,
            // alignSelf: "center",
          },
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
                  color={Colors.primary400}
                  style={{ paddingStart: 10 }}
                />
                {theme === "light" ? (
                  <Feather
                    onPress={() => toggleTheme()}
                    name="moon"
                    size={24}
                    color={Colors.primary400}
                  />
                ) : (
                  <Feather
                    onPress={() => toggleTheme()}
                    name="sun"
                    size={24}
                    color={Colors.primary400}
                  />
                )}
              </View>
            );
          },
        })}
      >
        <>
          <BottomTabs.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="home" size={24} color={color} />
              ),
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
              tabBarButton: () => {
                return null;
              },
            }}
          />
          <BottomTabs.Screen
            name="SubjectsNavigation"
            component={SubjectsNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="map" size={24} color={color} />
              ),
              headerTitle: "الخطة الدراسية",
            }}
          />
          <BottomTabs.Screen
            name="InfoNavigation"
            component={InfoNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <Feather name="menu" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
        </>
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}

type MyTabBarProps = BottomTabBarProps;

function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        // @ts-ignore
        const tabBarIcon = options.tabBarIcon((props) => {
          console.log("first");
        });
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // @ts-ignore
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, padding: 10, alignItems: "center" }}
          >
            <Text
              style={{
                color: isFocused ? "#333" : "#222",
                textAlign: "center",
                // width: 50,
                // height: 50,
                // borderRadius: 25,
                backgroundColor: isFocused ? Colors.primary400 : "#fff",
                padding: 10,
              }}
            >
              {tabBarIcon}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
