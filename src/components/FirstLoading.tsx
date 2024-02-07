import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRef, memo } from "react";
import {
  horizontalScale,
  moderateScale,
  ms,
  verticalScale,
} from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { StatusBar } from "expo-status-bar";
import { screenHeight, screenWidth } from "@Utils/Helper";
import { Feather } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

type Props = {
  onFinished: () => void;
  onLayout?: (event: any) => void;
};

const data = [
  {
    textAr1: "بدأت فكرتنا قبل أكثر من 30 عاماً!",
    textAr2: "وهي مستمرّة وستستمر طالما أن لها قلباً يجعلها حيّة..",
    textEn1: "OUR IDEA WAS BORN 30 YEARS AGO!",
    textEn2:
      "AND IT CONTINUES AND WILL BE FOR EVER. AS LONG AS THE IDEA HAS A HEART OF THAT MAKES IT ALIVE..",
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
      "وفرت لجنتكم منذ نشأتها محتوى أكاديمي متميز ساهم في تسهيل العملية التعليمية!",
    textAr2: "وما تزال مكتبة اللجنة اليوم شاهدة على ذلك",
    textEn1:
      "SINCE ITS INCEPTION, YOUR COMMITTEE HAS PROVIDED DISTINGUISHED ACADEMICS TO FACILITATE THE EDUCATIONAL PROCESS!",
    textEn2: "TODAY, THE COMMITTEE'S LIBRARY STILL BEARS WITNESS TO THAT",
    image: require("@Assets/images/4thSlide.webp"),
    arrPos: "right",
  },
  {
    textAr1:
      "يضاف حديثًا للجنتكم، تطبيقنا الذي يقدم كل ما يحتاجه طالب الهندسة الكهربائية",
    textEn1:
      "RECENTLY ADDED TO YOUR COMMITTEE, OUR APPLICATION WHICH PROVIDES EVERYTHING AN ELECTRICAL ENGINEERING STUDENT NEEDS!",
    textEn2: `
    
    
    `,
    image: require("@Assets/images/6thSlide.webp"),
    arrPos: "left",
  },
];

const FirstLoading = ({ onFinished, onLayout }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const onNext = () => ref.current?.next();
  return (
    <View onLayout={onLayout} style={{ flex: 1 }}>
      <StatusBar hidden />
      <Carousel
        ref={ref}
        loop={false}
        enabled={false}
        width={screenWidth}
        height={screenHeight}
        data={data}
        scrollAnimationDuration={1000}
        style={styles.carousel}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.container}>
            <ImageBackground source={item.image} style={styles.image}>
              <View style={styles.contentContainer}>
                {index != data.length - 1 ? (
                  <TouchableOpacity
                    style={[
                      index === 0
                        ? styles.buttonSlide1
                        : index === 4
                        ? styles.buttonSlide5
                        : styles.button,
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
                    style={styles.palyButton}
                    onPress={onFinished}
                  >
                    <Text
                      style={{
                        color: Colors.darkText,
                        fontSize: moderateScale(16),
                        fontFamily: "Bukra",
                      }}
                    >
                      بدء الاستخدام
                    </Text>
                  </TouchableOpacity>
                )}
                {item.textAr1 && (
                  <Text style={index === 0 ? styles.slide1 : styles.title1}>
                    {item.textAr1}
                  </Text>
                )}
                {item.textAr2 && (
                  <Text
                    style={
                      index === 0
                        ? styles.slide2
                        : index === 4
                        ? styles.slide5
                        : styles.title2
                    }
                  >
                    {item.textAr2}
                  </Text>
                )}
                {item.textEn1 && (
                  <Text style={index === 0 ? styles.slide1En : styles.title1En}>
                    {item.textEn1}
                  </Text>
                )}
                {item.textEn2 && (
                  <Text
                    style={
                      index === 0
                        ? styles.slide2En
                        : index === 4
                        ? styles.slideEn5
                        : styles.title2En
                    }
                  >
                    {item.textEn2}
                  </Text>
                )}
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  );
};

export default memo(FirstLoading);

const styles = StyleSheet.create({
  carousel: {
    transform: [{ rotate: "180deg" }],
  },
  container: {
    flex: 1,
    width: screenWidth,
    justifyContent: "center",
  },
  image: {
    width: screenWidth,
    height: "100%",
    alignSelf: "center",
    transform: [{ rotate: "180deg" }],
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: moderateScale(16),
  },
  buttonSlide1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightText,
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    top: verticalScale(-140),
    zIndex: 10,
  },
  buttonSlide5: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightText,
    width: ms(50),
    height: ms(50),
    borderRadius: ms(25),
    zIndex: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightText,
    width: ms(50),
    height: ms(50),
    borderRadius: ms(25),
    top: verticalScale(-80),
    zIndex: 10,
  },
  palyButton: {
    position: "absolute",
    bottom: verticalScale(80),
    right: 50,
    backgroundColor: Colors.lightText,
    height: verticalScale(50),
    borderRadius: moderateScale(15),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    justifyContent: "center",
    zIndex: 10,
    alignItems: "center",
  },
  slide1: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(8),
    lineHeight: verticalScale(30),
    color: Colors.lightText,
    fontFamily: "Bukra",
    top: verticalScale(-120),
    textAlign: "left",
  },
  slide2: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(28),
    marginTop: verticalScale(8),
    fontFamily: "Bukra",
    top: verticalScale(-120),
    color: Colors.lightText,
    textAlign: "left",
  },
  slide1En: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(8),
    fontWeight: "bold",
    color: Colors.lightText,
    top: verticalScale(-85),
  },
  slide2En: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(28),
    marginTop: verticalScale(8),
    fontWeight: "600",
    top: verticalScale(-85),
    color: Colors.lightText,
  },
  title1: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(8),
    lineHeight: verticalScale(30),
    color: Colors.lightText,
    fontFamily: "Bukra",
    top: verticalScale(-50),
    textAlign: "left",
  },
  title2: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(28),
    marginTop: verticalScale(8),
    fontFamily: "Bukra",
    top: verticalScale(-50),
    color: Colors.lightText,
    textAlign: "left",
  },
  slide5: {
    fontSize: moderateScale(15),
    lineHeight: verticalScale(22),
    marginTop: verticalScale(8),
    fontFamily: "Bukra",
    top: verticalScale(-50),
    color: Colors.lightText,
    textAlign: "left",
  },
  title1En: {
    fontSize: moderateScale(20),
    marginTop: verticalScale(8),
    fontWeight: "bold",
    color: Colors.lightText,
    top: verticalScale(-25),
  },
  title2En: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(28),
    marginTop: verticalScale(8),
    fontWeight: "600",
    top: verticalScale(-25),
    color: Colors.lightText,
  },
  slideEn5: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(22),
    marginTop: verticalScale(8),
    fontWeight: "bold",
    top: verticalScale(-25),
    color: Colors.lightText,
  },
});
