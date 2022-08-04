import { useState, useContext } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
  Linking,
} from "react-native";
import { screenHeight, screenWidth } from "@Utils/Helper";
import styles from "./styles";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import SearchInput from "@Components/ui/SearchInput";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.gray : Colors.darkTextColor;
  return (
    <>
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
      <SearchInput searchInput={search} setSearchInput={setSearch} />
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
            <Image
              source={require("@Assets/images/icons/full-post.png")}
              style={styles.icon}
            />
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
            <Image
              source={require("@Assets/images/icons/youtube.png")}
              style={styles.icon}
            />

            <Text style={[styles.iconText, { color: textColor }]}>قناة</Text>
            <Text style={[styles.iconText, { color: textColor }]}>اللجنة</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log("pressed");
            }}
            style={styles.iconContainer}
          >
            <Image
              source={require("@Assets/images/icons/weekly-notebooks.png")}
              style={styles.icon}
            />

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
            <Image
              source={require("@Assets/images/icons/teachers.png")}
              style={styles.icon}
            />
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
            <Image
              source={require("@Assets/images/icons/facebook.png")}
              style={styles.icon}
            />

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
            <Image
              source={require("@Assets/images/icons/education-institution.png")}
              style={styles.icon}
            />

            <Text style={[styles.iconText, { color: textColor }]}>موقع</Text>
            <Text style={[styles.iconText, { color: textColor }]}>الجامعة</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
