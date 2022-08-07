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
        list={Subjects}
        setResults={setResults}
        options={options}
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
          {[1, 2, 3].map((image, index) => (
            <Image
              key={index}
              source={require("@Assets/images/slider1.png")}
              style={styles.sliderImage}
            />
          ))}
        </ScrollView>
        <View style={styles.sliderDotsContainer}>
          {[1, 2, 3].map((image, index, array) => (
            <View
              key={index}
              style={[
                styles.sliderDot,
                currentIndex === array.length - 1 - index && styles.activeDot,
              ]}
            />
          ))}
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
          {[
            {
              title: "البوستات",
              title2: "الشاملة",
              icon: require("@Assets/images/icons/full-post.png"),
              onPress: () => console.log("pressed"),
            },
            {
              title: "قناة",
              title2: "اللجنة",
              icon: require("@Assets/images/icons/youtube.png"),
              onPress: () =>
                Linking.openURL("https://www.youtube.com/user/EECommittee"),
            },
            {
              title: "الدفاتر",
              title2: "الأسبوعية",
              icon: require("@Assets/images/icons/weekly-notebooks.png"),
              onPress: () => console.log("pressed"),
            },
          ].map((icon, index) => (
            <Pressable
              key={index}
              onPress={icon.onPress}
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
                <Image source={icon.icon} style={styles.icon} />
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
          {[
            {
              title: "الهيئة",
              title2: "التدريسية",
              icon: require("@Assets/images/icons/teachers.png"),
              onPress: () => console.log("pressed"),
            },
            {
              title: "مجموعة",
              title2: "الفيسبوك",
              icon: require("@Assets/images/icons/facebook.png"),
              onPress: () =>
                Linking.openURL("https://www.facebook.com/groups/eelajna.just"),
            },
            {
              title: "موقع",
              title2: "الجامعة",
              icon: require("@Assets/images/icons/education-institution.png"),
              onPress: () => console.log("pressed"),
            },
          ].map((icon, index) => (
            <Pressable
              key={index}
              onPress={icon.onPress}
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
                <Image source={icon.icon} style={styles.icon} />
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
    </>
  );
};

export default HomeScreen;
