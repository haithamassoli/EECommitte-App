import { Feather } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import { screenHeight, screenWidth } from "@Utils/Helper";
import { useLayoutEffect, useRef, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";

type Props = StackScreenProps<HomeStackParamList, "Calculator">;

const { width, height } = Dimensions.get("screen");
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
    textAr1: "بدأت فكرتنا قبل أكثر من 30 عاماً!",
    textAr2: "وهي مستمرّة وستستمر طالما أن لها قلباً يجعلها حيّة..",
    textEn1: "OUR IDEA WAS BORN 30 YEARS AGO!",
    textEn2: "AND IT CONTINUES AND WILL BE FOR EVER. AS LONG AS THE IDEA",
    image: require("@Assets/images/1stslide.webp"),
    arrPos: "right",
  },
];

const CalculatorScreen = ({ navigation }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    ),
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
        },
      });
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar hidden />
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={setImageIndex}
        pagingEnabled
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              width,
              justifyContent: "center",
              overflow: "hidden",
              shadowRadius: 20,
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}
          >
            <ImageBackground
              source={item.image}
              style={{
                width: screenWidth,
                height: screenHeight,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  padding: 16,
                }}
              >
                <Pressable
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#000",
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    top: -100,
                    left: item.arrPos === "right" ? 40 : screenWidth - 80,
                  }}
                  onPress={onNext}
                >
                  <Feather name="arrow-right" size={32} color="#fff" />
                </Pressable>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 8,
                    fontFamily: "Bukra",
                    top: -80,
                  }}
                >
                  {item.textAr1}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 8,
                    fontFamily: "Bukra",
                    top: -80,
                    lineHeight: 20,
                  }}
                >
                  {item.textAr2}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 8,
                    fontWeight: "bold",
                    top: -55,
                  }}
                >
                  {item.textEn1}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 8,
                    fontWeight: "600",
                    lineHeight: 20,
                    top: -55,
                  }}
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

export default CalculatorScreen;
