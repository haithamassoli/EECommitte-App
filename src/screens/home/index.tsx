import { useState, useEffect, memo, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Colors from "@GlobalStyle/Colors";
import { useColorScheme } from "@Src/store/themeContext";

import SearchInput from "@Components/ui/SearchInput";
import { HomeStackParamList } from "@Types/navigation";
import SubjectsData from "@Src/data/Subjects";
import Overlay from "@Components/Overlay";
import ImagesCarousel from "@Components/ImagesCarousel";
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { getDataMMKV } from "@Utils/Helper";
import {
  horizontalScale,
  moderateScale,
  ms,
  verticalScale,
} from "@Utils/Platform";
import { StatusBar } from "expo-status-bar";
import { fetchSliderImages } from "@Src/api/fetchSliderImages";
import { useIsFocused } from "@react-navigation/native";
import DoctorsData from "@Src/data/Doctors";
import { Image } from "expo-image";
import { ColorSchemeButton } from "@Components/ColorSchemeButton";

const options = {
  keys: ["name", "name2"],
};

export type HomeNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Home"
>;

type Props = StackScreenProps<HomeStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const isFocused = useIsFocused();
  const { theme } = useColorScheme();
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading, isFetching } = fetchSliderImages(refetchCounter);
  useEffect(() => {
    const CheckNotificationCount = () => {
      const count = getDataMMKV("notificationsCount");
      if (count != null) {
        setNotificationCount(count);
      }
    };
    CheckNotificationCount();
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <>
          <StatusBar
            style={theme === "light" ? "dark" : "light"}
            backgroundColor={
              theme === "light" ? Colors.lightBackground : Colors.darkBackground
            }
          />
          {searchBarFocused && (
            <Overlay
              onPress={() => {
                setSearchBarFocused(false);
                Keyboard.dismiss();
              }}
            />
          )}
          <SafeAreaView edges={["top"]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: verticalScale(12),
                marginHorizontal: horizontalScale(12),
              }}
            >
              <Image
                source={require("@Assets/images/icons/lagna-logo.png")}
                transition={400}
                contentFit="contain"
                style={{
                  width: ms(50),
                  height: ms(50),
                }}
              />
              <View style={{ marginStart: 8 }}>
                <Text
                  style={{
                    color: textColor,
                    fontSize: moderateScale(16),
                    fontFamily: "Bukra",
                  }}
                >
                  لجنة الهندسة الكهربائية
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(10),
                    fontFamily: "Bukra",
                    textAlign: "left",
                    color: textColor,
                    marginTop: verticalScale(2),
                  }}
                >
                  Electrical Engineering Committee
                </Text>
              </View>
            </View>
          </SafeAreaView>
          <View
            style={{ paddingHorizontal: horizontalScale(8), zIndex: 10000 }}
          >
            <SearchInput
              placeholder="ابحث عن ما يهمك: مواد، مدرسين، سنوات..."
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchBarFocused={searchBarFocused}
              setSearchBarFocused={setSearchBarFocused}
              results={results}
              list={[...SubjectsData, ...DoctorsData]}
              setResults={setResults}
              options={options}
            />
          </View>
        </>
      ),
    });
  }, [searchInput, searchBarFocused, results, theme]);

  const buttons = [
    {
      title: "المواد",
      title2: "المفضلة",
      lightIcon: require("@Assets/images/icons/light-icons/fav.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/fav.png"),
      onPress: () => navigation.navigate("Favorite"),
    },
    {
      title: "أبرز",
      title2: "شروحاتنا",
      lightIcon: require("@Assets/images/icons/light-icons/best.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/best.png"),
      onPress: () => navigation.navigate("OurExplanations"),
    },
    {
      title: "ما يخص",
      title2: "التسجيل",
      lightIcon: require("@Assets/images/icons/light-icons/registration.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/registration.png"),
      onPress: () => navigation.navigate("Registration"),
    },
    {
      title: "الهيئة",
      title2: "التدريسية",
      lightIcon: require("@Assets/images/icons/light-icons/doctors.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/doctors.png"),
      onPress: () => navigation.navigate("Doctors", { doctorId: undefined }),
    },
    {
      title: "تسجيلات",
      title2: "اللجنة",
      lightIcon: require("@Assets/images/icons/light-icons/records.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/records.png"),
      onPress: () => navigation.navigate("Records"),
    },
    {
      title: "حساب",
      title2: "المعدل",
      lightIcon: require("@Assets/images/icons/light-icons/calculator.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/calculator.png"),
      onPress: () => navigation.navigate("Calculator"),
    },
    {
      title: "قناة",
      title2: "اللجنة",
      lightIcon: require("@Assets/images/icons/light-icons/youtube.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/youtube.png"),
      onPress: () =>
        Linking.openURL("https://www.youtube.com/user/EECommittee"),
    },
    {
      title: "مجموعة",
      title2: "الفيسبوك",
      lightIcon: require("@Assets/images/icons/light-icons/facebook.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/facebook.png"),
      onPress: () =>
        Linking.openURL("https://www.facebook.com/groups/eelajna.just"),
    },
    {
      title: "الأسئلة",
      title2: "الشائعة",
      lightIcon: require("@Assets/images/icons/light-icons/faq.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/faq.png"),
      onPress: () => navigation.navigate("FAQ"),
    },
  ];

  // animation for the buttons first time with delay
  const animatedButtons = useRef(
    buttons.map((_, i) => new Animated.Value(0))
  ).current;
  useEffect(() => {
    Animated.stagger(
      100,
      animatedButtons.map((value) =>
        Animated.timing(value, {
          toValue: 100,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            if (refetchCounter === 0) {
              setRefetchCounter(1);
            }
          }}
          colors={theme === "light" ? [Colors.primary700] : [Colors.primary400]}
          progressBackgroundColor={
            theme === "light"
              ? Colors.lightBackgroundSec
              : Colors.darkBackgroundSec
          }
          tintColor={theme === "light" ? Colors.primary700 : Colors.primary400}
        />
      }
    >
      {searchBarFocused && (
        <Overlay
          onPress={() => {
            setSearchBarFocused(false);
            Keyboard.dismiss();
          }}
        />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: horizontalScale(12),
          marginTop: verticalScale(10),
          marginBottom: verticalScale(4),
        }}
      >
        <Text style={[styles.headerText, { color: textColor }]}>
          جديد لجنتكم
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: horizontalScale(80),
            height: verticalScale(50),
            borderRadius: moderateScale(25),
            justifyContent: "space-evenly",
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            {notificationCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: verticalScale(-5),
                  left: horizontalScale(-5),
                  backgroundColor: Colors.secondYear,
                  borderRadius: moderateScale(10),
                  width: horizontalScale(16),
                  height: verticalScale(16),
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                <Text
                  style={{
                    color: Colors.darkText,
                    fontSize: moderateScale(10),
                    fontFamily: "Bukra",
                  }}
                >
                  {notificationCount}
                </Text>
              </View>
            )}
            <Feather
              name={"bell"}
              size={moderateScale(24)}
              color={theme === "light" ? Colors.lightText : Colors.darkText}
            />
          </TouchableOpacity>
          <ColorSchemeButton />
        </View>
      </View>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: verticalScale(100),
            marginBottom: verticalScale(50),
          }}
        >
          <ActivityIndicator size="large" color={Colors.secondYear} />
        </View>
      ) : (
        Array.isArray(data) && (
          <View
            style={{
              marginHorizontal: horizontalScale(16),
            }}
          >
            <ImagesCarousel images={data} />
          </View>
        )
      )}
      <View style={styles.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.buttonContainer,
              { width: "33.33%", height: verticalScale(120) },
            ]}
            onPress={button.onPress}
          >
            <Animated.View
              style={{
                opacity: animatedButtons[index].interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                }),
                transform: [
                  {
                    translateY: animatedButtons[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: [verticalScale(20), 0],
                    }),
                  },
                ],
              }}
            >
              <Image
                source={theme === "light" ? button.lightIcon : button.darkIcon}
                style={styles.icon}
                contentFit="contain"
              />
              <Text
                style={[
                  styles.iconText,
                  { color: textColor, marginTop: verticalScale(4) },
                ]}
              >
                {button.title}
              </Text>
              <Text style={[styles.iconText, { color: textColor }]}>
                {button.title2}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(HomeScreen);
