import { useState, useContext, useLayoutEffect, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  Linking,
  Keyboard,
} from "react-native";
import styles from "./styles";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import SearchInput from "@Components/ui/SearchInput";
import { BottomTabParamList } from "@Types/navigation";
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import SubjectsData from "@Src/data/Subjects";
import { Subject } from "@Types/index";
import Overlay from "@Components/Overlay";
import DoctorsData from "@Src/data/Doctors";
import ImagesCarousel from "@Components/ImagesCarousel";
import ImagesCarouselData from "@Src/data/ImagesCarousel";

const options = {
  keys: ["name", "name2"],
};

export type HomeNavigationProp = BottomTabNavigationProp<
  BottomTabParamList,
  "Home"
>;

type Props = BottomTabScreenProps<BottomTabParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Subject[] | []>([]);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.gray : Colors.darkTextColor;

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
              marginHorizontal: 12,
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
                style={{ width: 50, height: 50, resizeMode: "contain" }}
              />
              <View style={{ marginStart: 8 }}>
                <Text
                  style={{
                    color: textColor,
                    fontSize: 16,
                    fontFamily: "Bukra",
                  }}
                >
                  لجنة الهندسة الكهربائية
                </Text>
                <Text
                  style={{
                    fontSize: 10,
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
              style={{ width: 50, height: 70, resizeMode: "contain" }}
            />
          </View>
          <SearchInput
            style={{
              marginHorizontal: 12,
              paddingBottom: 6,
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
        </>
      ),
    });
  }, [searchInput, searchBarFocused]);
  const rowOne = [
    {
      title: "ما يخص",
      title2: "المواد",
      lightIcon: require("@Assets/images/icons/light-icons/about-subject.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/about-subject.png"),
      onPress: () => console.log("pressed"),
    },
    {
      title: "أبرز",
      title2: "شروحاتنا",
      lightIcon: require("@Assets/images/icons/light-icons/best.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/best.png"),
      onPress: () => console.log("pressed"),
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
      onPress: () =>
        navigation.navigate("InfoNavigation", {
          screen: "Doctors",
          params: { doctorId: undefined },
        }),
    },
    {
      title: "تسجيلات",
      title2: "اللجنة",
      lightIcon: require("@Assets/images/icons/light-icons/records.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/records.png"),
      onPress: () => console.log("pressed"),
    },
    {
      title: "حساب",
      title2: "المعدل",
      lightIcon: require("@Assets/images/icons/light-icons/calculator.png"),
      darkIcon: require("@Assets/images/icons/dark-icons/calculator.png"),
      onPress: () => console.log("pressed"),
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
    <ScrollView>
      {searchBarFocused && (
        <Overlay
          onPress={() => {
            setSearchBarFocused(false);
            Keyboard.dismiss();
          }}
        />
      )}
      <Text style={[styles.headerText, { color: textColor }]}>جديد لجنتكم</Text>
      <ImagesCarousel images={ImagesCarouselData} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 16,
          marginTop: 40,
          marginHorizontal: 12,
        }}
      >
        <View style={styles.iconsContainer}>
          {rowOne.map((icon, index) => (
            <Pressable
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
            </Pressable>
          ))}
        </View>
        <View style={styles.iconsContainer}>
          {rowTwo.map((icon, index) => (
            <Pressable
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
            </Pressable>
          ))}
        </View>
        <View style={styles.iconsContainer}>
          {rowThree.map((icon, index) => (
            <Pressable
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
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
