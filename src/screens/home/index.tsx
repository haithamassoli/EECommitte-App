import { useState, useContext, useEffect, memo } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import SearchInput from "@Components/ui/SearchInput";
import { HomeStackParamList } from "@Types/navigation";
import SubjectsData from "@Src/data/Subjects";
import Overlay from "@Components/Overlay";
import ImagesCarousel from "@Components/ImagesCarousel";
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { StatusBar } from "expo-status-bar";
import { fetchSliderImages } from "@Src/api/fetchSliderImages";
import * as Notifications from "expo-notifications";
import { useIsFocused } from "@react-navigation/native";
import DoctorsData from "@Src/data/Doctors";

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
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading, isFetching, refetch }: any =
    fetchSliderImages(refetchCounter);

  useEffect(() => {
    const CheckNotificationCount = async () => {
      const count = await getDataFromStorage("notificationsCount");
      if (count != null) {
        setNotificationCount(count);
      }
    };
    CheckNotificationCount();
  }, [isFocused]);
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        addNotificationCount();
        // const userName = notification.request.content.data;
      }
    );
    const addNotificationCount = async () => {
      const count = await getDataFromStorage("notificationsCount");
      if (count != null) {
        await storeDataToStorage("notificationsCount", count + 1);
        setNotificationCount(count + 1);
      } else {
        await storeDataToStorage("notificationsCount", 1);
        setNotificationCount(1);
      }
    };
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigation.navigate("Notification");
        // const userName = response.notification.request.content.data;
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);
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
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: verticalScale(12),
                marginHorizontal: horizontalScale(12),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("@Assets/images/icons/lagna-logo.png")}
                  style={{
                    width: horizontalScale(50),
                    height: verticalScale(50),
                    resizeMode: "contain",
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
                    }}
                  >
                    Electrical Engineering EECommitte
                  </Text>
                </View>
              </View>
              <Image
                source={require("@Assets/images/icons/tasharck.png")}
                style={{
                  width: horizontalScale(50),
                  height: verticalScale(70),
                  resizeMode: "contain",
                }}
              />
            </View>
          </SafeAreaView>
          <View style={{ marginHorizontal: horizontalScale(8), zIndex: 10000 }}>
            <SearchInput
              style={{
                marginBottom: verticalScale(6),
              }}
              placeholder="ابحث عن ما يهمك: مواد، مدرسين، سنوات..."
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              searchBarFocused={searchBarFocused}
              setSearchBarFocused={setSearchBarFocused}
              results={results}
              // @ts-ignore
              list={[...SubjectsData, ...DoctorsData]}
              setResults={setResults}
              options={options}
              from="Home"
            />
          </View>
        </>
      ),
    });
  }, [searchInput, searchBarFocused, results, theme]);
  const handleRefetch = async () => {
    await refetch();
  };
  const rowOne = [
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
  ];

  const rowTwo = [
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
  ];

  const rowThree = [
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
          <TouchableOpacity onPress={toggleTheme}>
            <Feather
              name={theme === "light" ? "moon" : "sun"}
              size={moderateScale(24)}
              color={
                theme === "light"
                  ? Colors.darkBackgroundSec
                  : Colors.lightBackgroundSec
              }
            />
          </TouchableOpacity>
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
        Array.isArray(data) && <ImagesCarousel images={data} />
      )}
      <View
        style={{
          flex: 1,
          paddingHorizontal: horizontalScale(16),
          paddingBottom: verticalScale(16),
          marginTop: verticalScale(40),
          marginHorizontal: horizontalScale(12),
        }}
      >
        <View style={styles.iconsContainer}>
          {rowOne.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={icon.onPress}
              style={styles.iconContainer}
            >
              <View>
                <Image
                  source={theme === "light" ? icon.lightIcon : icon.darkIcon}
                  style={styles.icon}
                />
              </View>
              <Text
                style={[
                  styles.iconText,
                  { color: textColor, marginTop: verticalScale(4) },
                ]}
              >
                {icon.title}
              </Text>
              <Text style={[styles.iconText, { color: textColor }]}>
                {icon.title2}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.iconsContainer}>
          {rowTwo.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={icon.onPress}
              style={styles.iconContainer}
            >
              <View>
                <Image
                  source={theme === "light" ? icon.lightIcon : icon.darkIcon}
                  style={styles.icon}
                />
              </View>
              <Text
                style={[
                  styles.iconText,
                  { color: textColor, marginTop: verticalScale(4) },
                ]}
              >
                {icon.title}
              </Text>
              <Text style={[styles.iconText, { color: textColor }]}>
                {icon.title2}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.iconsContainer}>
          {rowThree.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={icon.onPress}
              style={styles.iconContainer}
            >
              <View>
                <Image
                  source={theme === "light" ? icon.lightIcon : icon.darkIcon}
                  style={styles.icon}
                />
              </View>
              <Text
                style={[
                  styles.iconText,
                  { color: textColor, marginTop: verticalScale(4) },
                ]}
              >
                {icon.title}
              </Text>
              <Text style={[styles.iconText, { color: textColor }]}>
                {icon.title2}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(HomeScreen);
