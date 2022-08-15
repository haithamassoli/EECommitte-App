import { Feather } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";

type Props = StackScreenProps<HomeStackParamList, "Calculator">;

const { width, height } = Dimensions.get("screen");
const data = [
  {
    textAr1: "بدأت فكرتنا قبل أكثر من 30 عاماً!",
    textAr2: "وهي مستمرّة وستستمر طالما أن لها قلباً يجعلها حيّة..",
    textEn1: "OUR IDEA WAS BORN 30 YEARS AGO!",
    textEn2: "AND IT CONTINUES AND WILL BE FOR EVER. AS LONG AS THE IDEA",
    image: require("@Assets/images/1stslide.png"),
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
    image: require("@Assets/images/2ndslide.png"),
  },
  {
    textAr1: "بدأت فكرتنا قبل أكثر من 30 عاماً!",
    textAr2: "وهي مستمرّة وستستمر طالما أن لها قلباً يجعلها حيّة..",
    textEn1: "OUR IDEA WAS BORN 30 YEARS AGO!",
    textEn2: "                    HAS A HEART THAT MAKES IT ALIVE..",
    image: require("@Assets/images/1stslide.png"),
  },
];

const imageW = width * 0.9;
const imageH = imageW * 2;

const CalculatorScreen = ({ navigation }: Props) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((slider, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={index}
              source={slider.image}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View
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
                  width: imageW,
                  height: imageH,
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
                      left: 40,
                    }}
                    onPress={() => {}}
                  >
                    <Feather name="arrow-left" size={32} color="#fff" />
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
          );
        }}
      />
    </View>
  );
};

export default CalculatorScreen;
