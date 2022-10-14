import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRef, useState, memo } from "react";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { StatusBar } from "expo-status-bar";
import { screenHeight, screenWidth } from "@Utils/Helper";
import { Feather } from "@expo/vector-icons";

type Props = {
  onFinished: () => void;
  onLayout?: (event: any) => void;
};

const FirstLoading = ({ onFinished, onLayout }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(data.length - 2);
  const scrollRef = useRef<ScrollView>(null);
  const onNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex !== 0 ? prevIndex - 1 : 0)),
      scrollRef.current?.scrollTo({
        animated: true,
        x: screenWidth * selectedIndex,
        y: 0,
      });
  };

  const setImageIndex = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const newSelectedIndex = Math.floor(contentOffset.x / viewSize.width);
    setSelectedIndex(newSelectedIndex);
  };
  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <StatusBar hidden />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={setImageIndex}
        pagingEnabled
      >
        {data.map((item, index) => (
          <View key={index} style={styles.container}>
            <ImageBackground source={item.image} style={styles.image}>
              <View style={styles.contentContainer}>
                {index != data.length - 1 ? (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        left:
                          item.arrPos === "right"
                            ? horizontalScale(40)
                            : screenWidth - 100,
                      },
                    ]}
                    onPress={onNext}
                  >
                    <Feather
                      name="arrow-left"
                      size={moderateScale(32)}
                      color="#fff"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        left:
                          item.arrPos === "right"
                            ? horizontalScale(40)
                            : screenWidth - 100,
                      },
                    ]}
                    onPress={onFinished}
                  >
                    <Feather
                      name="arrow-left"
                      size={moderateScale(32)}
                      color="#fff"
                    />
                  </TouchableOpacity>
                )}
                <Text style={index != 4 ? styles.customTitle1 : styles.title1}>
                  {item.textAr1}
                </Text>
                <Text
                  style={
                    index != 3 && index != 1
                      ? styles.title2
                      : styles.customTitle2
                  }
                >
                  {item.textAr2}
                </Text>
                <Text style={styles.title1En}>{item.textEn1}</Text>
                <Text
                  style={
                    index != 3 && index != 1
                      ? styles.title2En
                      : styles.customTitle2En
                  }
                >
                  {item.textEn2}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(FirstLoading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    justifyContent: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight,
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: moderateScale(16),
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkBackgroundSec,
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    top: verticalScale(-100),
  },
  title1: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(8),
    color: Colors.lightText,
    fontFamily: "Bukra",
    top: verticalScale(-80),
    textAlign: "left",
  },
  customTitle1: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(24),
    marginTop: verticalScale(8),
    color: Colors.lightText,
    fontFamily: "Bukra",
    top: verticalScale(-80),
    textAlign: "left",
  },
  title2: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(28),
    marginTop: verticalScale(8),
    fontFamily: "Bukra",
    top: verticalScale(-80),
    color: Colors.lightText,
    textAlign: "left",
  },
  customTitle2: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(24),
    marginTop: verticalScale(8),
    fontFamily: "Bukra",
    top: verticalScale(-80),
    color: Colors.lightText,
    textAlign: "left",
  },
  title1En: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(8),
    fontWeight: "bold",
    color: Colors.lightText,
    top: verticalScale(-55),
  },
  title2En: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(28),
    marginTop: verticalScale(8),
    fontWeight: "600",
    top: verticalScale(-55),
    color: Colors.lightText,
  },
  customTitle2En: {
    fontSize: moderateScale(14),
    lineHeight: verticalScale(22),
    marginTop: verticalScale(8),
    fontWeight: "700",
    top: verticalScale(-55),
    color: Colors.lightText,
  },
});

const data = [
  {
    textAr1: "بدأت فكرتنا قبل أكثر من 30 عاماً!",
    textAr2: "وهي مستمرّة وستستمر طالما أن لها قلباً يجعلها حيّة..",
    textEn1: "OUR IDEA WAS BORN 30 YEARS AGO!",
    textEn2: "AND IT CONTINUES AND WILL BE FOR EVER. AS LONG AS THE IDEA",
    image: require("@Assets/images/1stslide.webp"),
    arrPos: "right",
  },
  {
    textAr1:
      "تعتبر لجنة الهندسة الكهربائية من أقدم اللجان والفرق الطلابية في جامعة العلوم والتكنولوجيا ",
    textAr2:
      " حيث يعود تأسيسها لما قبل 1990 توازياَ مع تأسيس جامعة العلوم والتكنولوجيا",
    textEn1:
      "ELECTRICAL ENGINEERING COMMITTEE IS ONE OF THE OLDEST STUDENT COMMITTEES AND TEAMS AT JUST!",
    textEn2:
      " IT’S ESTABLISHMENT DATES BACK TO BEFORE 1990, PARALLEL TO THE ESTABLISHMENT OF JUST.",
    image: require("@Assets/images/2ndslide.webp"),
    arrPos: "left",
  },

  {
    textAr1:
      "أما فيما يخص إرشاد الطلبة فإن اللجنة ترافق كل دفعة منذ دخولها الجامعة وحتى تخرجها بفريق طلابي من أبناء الدفعة نفسها!",
    textAr2: "",
    textEn1:
      "AS FOR THE GUIDANCE OF STUDENTS, THE COMMITTEE ACCOMPANIES EVERY BATCH SINCE ENTERING THE UNIVERSITY UNTIL GRADUATION WITH A TEAM FROM THE SAME BATCH!",
    textEn2: "",
    image: require("@Assets/images/3rdSlide.webp"),
    arrPos: "right",
  },
  {
    textAr1:
      "وفرت لجنتكم منذ نشأتها محتوى أكاديمي متميز ساهم في تسهيل العملية التعليمية!",
    textAr2: "وما تزال مكتبة اللجنة اليوم شاهدة على ذلك",
    textEn1:
      "SINCE ITS INCEPTION, YOUR COMMITTEE HAS PROVIDED DISTINGUISHED ACADEMICS TO FACILITATE THE EDUCATIONAL PROCESS!",
    textEn2: "TODAY, THE COMMITTEE LIBRARY STILL BEARS WITNESS TO THAT",
    image: require("@Assets/images/4thSlide.webp"),
    arrPos: "left",
  },
];
