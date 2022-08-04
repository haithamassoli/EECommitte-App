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
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
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
      <Text style={styles.headerText}>جديد لجنتكم</Text>
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
            <Text style={styles.iconText}>البوستات</Text>
            <Text style={styles.iconText}>الشاملة</Text>
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

            <Text style={styles.iconText}>قناة</Text>
            <Text style={styles.iconText}>اللجنة</Text>
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

            <Text style={styles.iconText}>الدفاتر</Text>
            <Text style={styles.iconText}>الأسبوعية</Text>
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
            <Text style={styles.iconText}>الهيئة</Text>
            <Text style={styles.iconText}>التدريسية</Text>
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

            <Text style={styles.iconText}>مجموعة</Text>
            <Text style={styles.iconText}>الفيسبوك</Text>
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

            <Text style={styles.iconText}>موقع</Text>
            <Text style={styles.iconText}>الجامعة</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
