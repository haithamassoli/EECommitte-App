import CustomHeader from "@Components/ui/CustomHeader";
import CustomModal from "@Components/ui/Modal";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "@Src/store/themeContext";
import { HomeStackParamList } from "@Types/navigation";
import { useContext, useLayoutEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
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
  const [visible, setVisible] = useState(false);
  const [massage, setMassage] = useState("");
  const [semester, setSemester] = useState(0);
  const [GPA, setGPA] = useState(0);
  const [prevGPA, setPrevGPA] = useState<number>(0);
  const [prevSemesterHour, setPrevSemesterHour] = useState<number>(0);
  const [selectedHour, setSelectedHour] = useState([{ label: "3", value: 3 }]);
  const [selectedGrade, setSelectedGrade] = useState([
    { label: "A+", value: 4.2 },
  ]);
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

  const addSubject = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (subjectCount >= 8) {
      setMassage("لا يمكن اضافة المزيد من المواد");
      setVisible(true);
    } else {
      setSubjectCount((e) => e + 1);
      setSelectedHour((e) => [...e, { label: "3", value: 3 }]);
      setSelectedGrade((e) => [...e, { label: "A+", value: 4.2 }]);
    }
  };

  const deleteSubject = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (subjectCount === 1) {
      setMassage("لا يمكن حذف كل المواد!");
      setVisible(true);
      return;
    }
    setSubjectCount((e) => e - 1);
    setSelectedHour((e) => e.slice(0, -1));
    setSelectedGrade((e) => e.slice(0, -1));
  };

  const calculateRate = () => {
    let totalHour = 0;
    let totalGrade = 0;
    for (let i = 0; i < subjectCount; i++) {
      totalHour += selectedHour[i].value;
      totalGrade += selectedGrade[i].value * selectedHour[i].value;
    }
    setSemester(totalGrade / totalHour);
    if (cumulative) {
      // @ts-ignore
      if (isNaN(prevGPA)) {
        setMassage("يجب إدخال المعدل التراكمي السابق!");
        setVisible(true);
        // @ts-ignore
      } else if (isNaN(prevSemesterHour)) {
        setMassage("يجب إدخال عدد الساعات المقطوعة!");
        setVisible(true);
      } else if (prevSemesterHour + totalHour > 160) {
        setMassage("عدد الساعات المقطوعة لا يمكن أن يتعدى 160 ساعة!");
        setVisible(true);
      } else if (prevGPA > 4.2) {
        setMassage("المعدل التراكمي السابق لا يمكن أن يتعدى 4.2!");
        setVisible(true);
      } else {
        setGPA(
          // @ts-ignore
          (prevGPA * prevSemesterHour + totalGrade) /
            // @ts-ignore
            (prevSemesterHour + totalHour)
        );
      }
    }
  };

  const handleGPA = (value: "-" | number) => {
    setPrevGPA(Number(value));
  };

  const handleSemesterHour = (value: "-" | number) => {
    setPrevSemesterHour(Number(value));
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 14 }}>
      <CustomModal visible={visible} title={massage} setVisible={setVisible} />
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
              backgroundColor:
                cumulative && theme === "light"
                  ? Colors.primaryLight
                  : cumulative && theme === "dark"
                  ? Colors.darkBackgroundSec
                  : theme === "light"
                  ? Colors.primaryLight
                  : Colors.darkBackgroundSec,
              justifyContent: "center",
              alignItems: cumulative ? "flex-end" : "flex-start",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: cumulative ? Colors.primary500 : Colors.gray,
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
          <CardRate title="المعدل الفصلي" rate={semester} />
          {cumulative && <CardRate title="المعدل التراكمي" rate={GPA} />}
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
                المعدل التراكمي السابق
              </Text>
              {/* @ts-ignore */}
              <TextInput
                style={{
                  fontFamily: "TajawalBold",
                  color: textColor,
                  fontSize: 18,
                  width: 72,
                  textAlign: "center",
                  borderRadius: 10,
                  backgroundColor:
                    theme === "light"
                      ? Colors.lightBackgroundSec
                      : Colors.darkBackgroundSec,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  marginLeft: 14,
                }}
                keyboardType="numeric"
                value={prevGPA.toString()}
                // @ts-ignore
                onChangeText={handleGPA}
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
                  عدد الساعات المقطوعة
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
                  backgroundColor:
                    theme === "light"
                      ? Colors.lightBackgroundSec
                      : Colors.darkBackgroundSec,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  marginLeft: 14,
                }}
                keyboardType="numeric"
                value={prevSemesterHour.toString()}
                // @ts-ignore
                onChangeText={handleSemesterHour}
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
              backgroundColor:
                theme === "light"
                  ? Colors.lightBackgroundSec
                  : Colors.darkBackgroundSec,
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
              backgroundColor:
                theme === "light"
                  ? Colors.lightBackgroundSec
                  : Colors.darkBackgroundSec,
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
              backgroundColor:
                theme === "light"
                  ? Colors.lightBackgroundSec
                  : Colors.darkBackgroundSec,
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
            itemNumber={index}
          />
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Pressable
            onPress={addSubject}
            style={{
              backgroundColor: Colors.primary500,
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
              width: "48%",
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
            onPress={deleteSubject}
            style={{
              backgroundColor: "red",
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 8,
              justifyContent: "center",
              alignItems: "center",
              width: "48%",
            }}
          >
            <Text
              style={{
                fontFamily: "Bukra",
                color: Colors.lightBackground,
                fontSize: 16,
              }}
            >
              حذف مادة
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Pressable
        onPress={calculateRate}
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
