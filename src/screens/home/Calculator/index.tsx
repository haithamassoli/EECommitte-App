import CustomHeader from "@Components/ui/CustomHeader";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "@Src/store/themeContext";
import { HomeStackParamList } from "@Types/navigation";
import { useContext, useLayoutEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  Pressable,
  TextInput,
  LayoutAnimation,
} from "react-native";
import CardRate from "./CardRate";
import SubjectRate from "./SubjectRate";

type Props = StackScreenProps<HomeStackParamList, "Calculator">;

const CalculatorScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/calculator.png")
      : require("@Assets/images/icons/dark-icons/calculator.png");

  const scrollViewRef = useRef();
  const [cumulative, setCumulative] = useState(true);
  const [selectedHour, setSelectedHour] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [subjectCount, setSubjectCount] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "حساب المعدل",
      headerTitleStyle: {
        fontFamily: "Bukra",
      },
      headerLeft: () => (
        <CustomHeader
          onPress={() => navigation.goBack()}
          iconColor={iconColor}
        />
      ),
    });
  }, []);
  return (
    <View style={{ flex: 1, marginHorizontal: 14 }}>
      <ScrollView
        style={{ flex: 1 }}
        // @ts-ignore
        ref={scrollViewRef}
        onContentSizeChange={() =>
          // @ts-ignore
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "TajawalBold",
              color: textColor,
              fontSize: 16,
            }}
          >
            حساب المعدل التراكمي
          </Text>
          <Pressable
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setCumulative((e) => !e);
            }}
            style={{
              width: 50,
              height: 30,
              borderRadius: 15,
              backgroundColor: cumulative
                ? Colors.primaryLight
                : Colors.lightGray,
              justifyContent: "center",
              alignItems: cumulative ? "flex-end" : "flex-start",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: cumulative ? Colors.primary400 : Colors.gray,
              }}
            ></View>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: cumulative ? "space-between" : "center",
            alignItems: "center",
          }}
        >
          <CardRate title="المعدل الفصلي" grade="ممتاز" rate={3.5} />
          {cumulative && (
            <CardRate title="المعدل التراكمي" grade="ممتاز" rate={3.5} />
          )}
        </View>
        {cumulative && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Bukra",
                  color: textColor,
                  fontSize: 16,
                  width: 200,
                }}
              >
                عدد الساعات المقطوعة
              </Text>
              <TextInput
                style={{
                  fontFamily: "TajawalBold",
                  color: textColor,
                  fontSize: 18,
                  width: 72,
                  textAlign: "center",
                  borderRadius: 10,
                  backgroundColor: Colors.lightBackgroundSec,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  marginLeft: 14,
                }}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: 20,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Bukra",
                    color: textColor,
                    fontSize: 16,
                    width: 200,
                  }}
                >
                  المعدل التراكمي السابق
                </Text>
                <Text
                  style={{
                    fontFamily: "TajawalMedium",
                    color: textColor,
                    fontSize: 12,
                    marginTop: 4,
                    width: 150,
                    alignSelf: "flex-start",
                  }}
                >
                  *لا يشمل الساعات التي تم احتسابها ناجح راسب
                </Text>
              </View>
              <TextInput
                style={{
                  fontFamily: "TajawalBold",
                  color: textColor,
                  fontSize: 18,
                  width: 72,
                  textAlign: "center",
                  borderRadius: 10,
                  backgroundColor: Colors.lightBackgroundSec,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  marginLeft: 14,
                }}
                keyboardType="numeric"
              />
            </View>
          </>
        )}
        <Text
          style={{
            fontFamily: "TajawalBold",
            color: textColor,
            textAlign: "center",
            fontSize: 28,
            marginTop: 20,
          }}
        >
          مواد الفصل الحالي
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.lightBackgroundSec,
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Bukra",
                color: textColor,
                fontSize: 16,
              }}
            >
              وزن المادة
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.lightBackgroundSec,
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
              width: 174,
            }}
          >
            <Text
              style={{
                fontFamily: "Bukra",
                color: textColor,
                fontSize: 16,
              }}
            >
              اسم المادة
            </Text>
          </View>
          <View
            style={{
              backgroundColor: Colors.lightBackgroundSec,
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Bukra",
                color: textColor,
                fontSize: 16,
              }}
            >
              العلامة
            </Text>
          </View>
        </View>
        {numberToArray(subjectCount).map((_, index) => (
          <SubjectRate
            key={index}
            setSelectedHour={setSelectedHour}
            setSelectedGrade={setSelectedGrade}
          />
        ))}
      </ScrollView>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setSubjectCount((e) => e + 1);
        }}
        style={{
          backgroundColor: Colors.primary400,
          borderRadius: 20,
          paddingVertical: 12,
          paddingHorizontal: 8,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontFamily: "Bukra",
            color: Colors.lightBackground,
            fontSize: 16,
          }}
        >
          إضافة مادة
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setSubjectCount((e) => e + 1);
        }}
        style={{
          backgroundColor: "green",
          borderRadius: 20,
          paddingVertical: 12,
          paddingHorizontal: 8,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 6,
        }}
      >
        <Text
          style={{
            fontFamily: "Bukra",
            color: Colors.lightBackground,
            fontSize: 16,
          }}
        >
          احتساب المعدل
        </Text>
      </Pressable>
    </View>
  );
};

export default CalculatorScreen;

const numberToArray = (number: number) => {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(i);
  }
  return array;
};
