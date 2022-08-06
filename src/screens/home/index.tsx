import { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  Linking,
  Keyboard,
} from "react-native";
import { screenHeight, screenWidth } from "@Utils/Helper";
import styles from "./styles";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import SearchInput from "@Components/ui/SearchInput";
import { BottomTabParamList } from "@Types/navigation";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Fuse from "fuse.js";
import Subjects from "@Src/data/Subjects";
import { Subject } from "@Types/index";

const options = {
  keys: ["name", "name2"],
};

type Props = BottomTabScreenProps<BottomTabParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Subject[] | []>([]);
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.gray : Colors.darkTextColor;

  useEffect(() => {
    const fuse = new Fuse(Subjects, options);
    const searchResults = fuse.search(searchInput);
    const newArr = searchResults.slice(0, 5).map((result) => {
      return result.item;
    });
    setResults(newArr.slice(0, 5));
  }, [searchInput]);

  return (
    <>
      {searchBarFocused && (
        <Pressable
          onPress={() => {
            setSearchBarFocused(false);
            Keyboard.dismiss();
          }}
          style={{
            backgroundColor: Colors.overlay,
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></Pressable>
      )}
      <View style={styles.logosContainer}>
        <View style={styles.logoAndTextContainer}>
          <Image
            source={require("@Assets/images/icons/lagna-logo.png")}
            style={styles.lagnaLogo}
          />
          <View style={styles.logoTextContainter}>
            <Text style={[styles.logoTitleAr, { color: textColor }]}>
              لجنة الهندسة الكهربائية
            </Text>
            <Text style={[styles.logoTitleEn, { color: textColor }]}>
              Electrical Engineering EECommitte
            </Text>
          </View>
        </View>
        <Image
          source={require("@Assets/images/icons/tasharck.png")}
          style={styles.tasharckLogo}
        />
      </View>
      <SearchInput
        style={{ marginHorizontal: 12 }}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchBarFocused={searchBarFocused}
        setSearchBarFocused={setSearchBarFocused}
        results={results}
      />
      <Text style={[styles.headerText, { color: textColor }]}>جديد لجنتكم</Text>
      <View
        style={{
          height: screenHeight * 0.28,
        }}
      >
        <ScrollView
          horizontal
          pagingEnabled
          alwaysBounceHorizontal
          showsHorizontalScrollIndicator={false}
          bounces={true}
          automaticallyAdjustsScrollIndicatorInsets={false}
          automaticallyAdjustContentInsets={false}
          alwaysBounceVertical={false}
          contentInsetAdjustmentBehavior="never"
          snapToAlignment="center"
          onScroll={(e) => {
            setCurrentIndex(
              Math.floor(e.nativeEvent.contentOffset.x / (screenWidth - 40))
            );
          }}
          style={styles.sliderContainer}
        >
          <Image
            source={require("@Assets/images/slider1.png")}
            style={styles.sliderImage}
          />
          <Image
            source={require("@Assets/images/slider1.png")}
            style={styles.sliderImage}
          />
          <Image
            source={require("@Assets/images/slider1.png")}
            style={styles.sliderImage}
          />
        </ScrollView>
        <View style={styles.sliderDotsContainer}>
          <View
            style={[styles.sliderDot, currentIndex === 2 && styles.activeDot]}
          />
          <View
            style={[styles.sliderDot, currentIndex === 1 && styles.activeDot]}
          />
          <View
            style={[styles.sliderDot, currentIndex === 0 && styles.activeDot]}
          />
        </View>
      </View>
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
          <Pressable
            onPress={() => {
              console.log("pressed");
            }}
            style={styles.iconContainer}
          >
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor:
                    theme === "light" ? Colors.lightGray : "#1b2836",
                },
              ]}
            >
              <Image
                source={require("@Assets/images/icons/full-post.png")}
                style={styles.icon}
              />
            </View>
            <Text style={[styles.iconText, { color: textColor }]}>
              البوستات
            </Text>
            <Text style={[styles.iconText, { color: textColor }]}>الشاملة</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL("https://www.youtube.com/user/EECommittee");
            }}
            style={styles.iconContainer}
          >
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor:
                    theme === "light" ? Colors.lightGray : "#1b2836",
                },
              ]}
            >
              <Image
                source={require("@Assets/images/icons/youtube.png")}
                style={styles.icon}
              />
            </View>
            <Text style={[styles.iconText, { color: textColor }]}>قناة</Text>
            <Text style={[styles.iconText, { color: textColor }]}>اللجنة</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("pressed");
            }}
            style={styles.iconContainer}
          >
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor:
                    theme === "light" ? Colors.lightGray : "#1b2836",
                },
              ]}
            >
              <Image
                source={require("@Assets/images/icons/weekly-notebooks.png")}
                style={styles.icon}
              />
            </View>

            <Text style={[styles.iconText, { color: textColor }]}>الدفاتر</Text>
            <Text style={[styles.iconText, { color: textColor }]}>
              الأسبوعية
            </Text>
          </Pressable>
        </View>
        <View style={styles.iconsContainer}>
          <Pressable
            onPress={() => {
              console.log("pressed");
            }}
            style={styles.iconContainer}
          >
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor:
                    theme === "light" ? Colors.lightGray : "#1b2836",
                },
              ]}
            >
              <Image
                source={require("@Assets/images/icons/teachers.png")}
                style={styles.icon}
              />
            </View>
            <Text style={[styles.iconText, { color: textColor }]}>الهيئة</Text>
            <Text style={[styles.iconText, { color: textColor }]}>
              التدريسية
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              Linking.openURL("https://www.facebook.com/groups/eelajna.just");
            }}
            style={styles.iconContainer}
          >
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor:
                    theme === "light" ? Colors.lightGray : "#1b2836",
                },
              ]}
            >
              <Image
                source={require("@Assets/images/icons/facebook.png")}
                style={styles.icon}
              />
            </View>
            <Text style={[styles.iconText, { color: textColor }]}>مجموعة</Text>
            <Text style={[styles.iconText, { color: textColor }]}>
              الفيسبوك
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("pressed");
            }}
            style={styles.iconContainer}
          >
            <View
              style={[
                styles.iconBackground,
                {
                  backgroundColor:
                    theme === "light" ? Colors.lightGray : "#1b2836",
                },
              ]}
            >
              <Image
                source={require("@Assets/images/icons/education-institution.png")}
                style={styles.icon}
              />
            </View>

            <Text style={[styles.iconText, { color: textColor }]}>موقع</Text>
            <Text style={[styles.iconText, { color: textColor }]}>الجامعة</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
