import { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import SearchInput from "@Components/ui/SearchInput";
import { HomeStackParamList } from "@Types/navigation";
import SubjectsData from "@Src/data/Subjects";
import Overlay from "@Components/Overlay";
import DoctorsData from "@Src/data/Doctors";
import ImagesCarousel from "@Components/ImagesCarousel";
import ImagesCarouselData from "@Src/data/ImagesCarousel";
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { getDataFromStorage } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { StatusBar } from "expo-status-bar";

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
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  useEffect(() => {
    const firstTime = async () => {
      const firstTime = await getDataFromStorage("firstTime");
      if (firstTime == true) {
        navigation.navigate("AboutEECommitte");
      }
    };
    firstTime();
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
          <View style={{ marginHorizontal: horizontalScale(8) }}>
            <SearchInput
              style={{
                marginBottom: verticalScale(6),
              }}
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

  const rowOne = [
    {
      title: "المفضلة",
      title2: "",
      lightIcon: require("@Assets/images/icons/light-icons/about-subject.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/about-subject.png"),
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
      title: "الدفاتر",
      title2: "الأسبوعية",
      lightIcon: require("@Assets/images/icons/light-icons/weekly-notebooks.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/weekly-notebooks.png"),
      onPress: () => console.log("pressed"),
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
      title: "ما يخص",
      title2: "التسجيل",
      lightIcon: require("@Assets/images/icons/light-icons/registration.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/registration.png"),
      onPress: () => console.log("pressed"),
    },
  ];

  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity onPress={() => console.log("pressed")}>
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
              color={theme === "light" ? Colors.lightText : Colors.darkText}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ImagesCarousel images={ImagesCarouselData} />
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
              <Text style={[styles.iconText, { color: textColor }]}>
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
              <Text style={[styles.iconText, { color: textColor }]}>
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
              <Text style={[styles.iconText, { color: textColor }]}>
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

export default HomeScreen;
