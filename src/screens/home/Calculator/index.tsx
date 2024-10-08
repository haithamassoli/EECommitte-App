import CustomModal from "@Components/ui/Modal";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { screenWidth } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useState, useRef } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import CardRate from "./CardRate";
import SubjectRate from "./SubjectRate";
import Animated, { FadeInUp } from "react-native-reanimated";

const CalculatorScreen = () => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const scrollViewRef = useRef();
  const [cumulative, setCumulative] = useState(true);
  const [visible, setVisible] = useState(false);
  const [massage, setMassage] = useState("");
  const [semester, setSemester] = useState("0");
  const [GPA, setGPA] = useState("0");
  const [prevGPA, setPrevGPA] = useState("0");
  const [prevSemesterHour, setPrevSemesterHour] = useState("0");
  const [selectedHour, setSelectedHour] = useState([{ label: "3", value: 3 }]);
  const [selectedGrade, setSelectedGrade] = useState([
    { label: "A+", value: 4.2 },
  ]);
  const [subjectCount, setSubjectCount] = useState(1);

  const addSubject = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (subjectCount >= 12) {
      setMassage("لا يمكن إضافة المزيد من المواد");
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
    if (totalHour === 0) {
      setMassage("لا يمكن ان يكون الساعات 0");
      setVisible(true);
      return;
    }
    if (cumulative) {
      // @ts-ignore
      if (isNaN(prevGPA)) {
        setMassage("يجب إدخال المعدل التراكمي السابق!");
        setVisible(true);
        // @ts-ignore
      } else if (isNaN(prevSemesterHour)) {
        setMassage("يجب إدخال عدد الساعات المقطوعة!");
        setVisible(true);
      } else if (+prevSemesterHour + totalHour > 160) {
        setMassage("عدد الساعات المقطوعة لا يمكن أن يتعدى 160 ساعة!");
        setVisible(true);
      } else if (+prevGPA > 4.2) {
        setMassage("المعدل التراكمي السابق لا يمكن أن يتعدى 4.2!");
        setVisible(true);
      } else {
        setGPA(
          (
            (+prevGPA * +prevSemesterHour + totalGrade) /
            (+prevSemesterHour + totalHour)
          ).toFixed(2)
        );
        setSemester((+totalGrade / +totalHour).toFixed(2));
      }
    } else {
      setSemester((+totalGrade / +totalHour).toFixed(2));
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: horizontalScale(14) }}>
      <CustomModal visible={visible} title={massage} setVisible={setVisible} />
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        // @ts-ignore
        ref={scrollViewRef}
        onContentSizeChange={() =>
          // @ts-ignore
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        <Animated.View
          entering={FadeInUp.duration(600)}
          style={styles.container}
        >
          <Text style={[styles.gpa, { color: textColor }]}>
            حساب المعدل التراكمي
          </Text>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setCumulative((e) => !e);
            }}
            style={[
              styles.gpaToggle,
              {
                backgroundColor:
                  cumulative && theme === "light"
                    ? Colors.primaryLight
                    : cumulative && theme === "dark"
                    ? Colors.darkBackgroundSec
                    : theme === "light"
                    ? Colors.lightGray
                    : Colors.darkBackgroundSec,
                alignItems: cumulative ? "flex-end" : "flex-start",
              },
            ]}
          >
            <View
              style={[
                styles.gpaToggleCircle,
                {
                  backgroundColor: cumulative ? Colors.primary500 : Colors.gray,
                },
              ]}
            ></View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(600).delay(200)}
          style={{
            flexDirection: "row",
            justifyContent: cumulative ? "space-between" : "center",
            alignItems: "center",
          }}
        >
          <CardRate title="المعدل الفصلي" rate={semester} />
          {cumulative && <CardRate title="المعدل التراكمي" rate={GPA} />}
        </Animated.View>
        {cumulative && (
          <>
            <Animated.View
              entering={FadeInUp.duration(600).delay(400)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: verticalScale(20),
              }}
            >
              <Text
                style={{
                  fontFamily: "Bukra",
                  color: textColor,
                  fontSize: moderateScale(16),
                  width: horizontalScale(200),
                  textAlign: "left",
                }}
              >
                المعدل التراكمي السابق
              </Text>
              <TextInput
                style={{
                  fontFamily: "TajawalBold",
                  color: textColor,
                  fontSize: moderateScale(18),
                  width: horizontalScale(72),
                  textAlign: "center",
                  borderRadius: moderateScale(10),
                  backgroundColor:
                    theme === "light"
                      ? Colors.lightBackgroundSec
                      : Colors.darkBackgroundSec,
                  paddingVertical: verticalScale(4),
                  paddingHorizontal: horizontalScale(8),
                  marginLeft: horizontalScale(14),
                }}
                keyboardType="numeric"
                value={prevGPA}
                onChangeText={(e) => setPrevGPA(e)}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInUp.duration(600).delay(600)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                marginTop: verticalScale(20),
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Bukra",
                    color: textColor,
                    textAlign: "left",
                    fontSize: moderateScale(16),
                    width: horizontalScale(200),
                  }}
                >
                  عدد الساعات المقطوعة
                </Text>
                <Text
                  style={{
                    fontFamily: "TajawalMedium",
                    textAlign: "left",
                    color: textColor,
                    fontSize: moderateScale(12),
                    marginTop: verticalScale(4),
                    width: horizontalScale(150),
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
                  fontSize: moderateScale(18),
                  width: horizontalScale(72),
                  textAlign: "center",
                  borderRadius: moderateScale(10),
                  backgroundColor:
                    theme === "light"
                      ? Colors.lightBackgroundSec
                      : Colors.darkBackgroundSec,
                  paddingVertical: verticalScale(4),
                  paddingHorizontal: horizontalScale(8),
                  marginLeft: horizontalScale(14),
                }}
                keyboardType="numeric"
                value={prevSemesterHour}
                onChangeText={(e) => setPrevSemesterHour(e)}
              />
            </Animated.View>
          </>
        )}
        <Animated.Text
          entering={FadeInUp.duration(600).delay(800)}
          style={{
            fontFamily: "TajawalBold",
            color: textColor,
            textAlign: "center",
            fontSize: moderateScale(28),
            marginTop: verticalScale(20),
          }}
        >
          مواد الفصل الحالي
        </Animated.Text>
        <Animated.View
          entering={FadeInUp.duration(600).delay(1000)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: verticalScale(20),
          }}
        >
          <View
            style={[
              styles.subjectHG,
              {
                backgroundColor:
                  theme === "light"
                    ? Colors.lightBackgroundSec
                    : Colors.darkBackgroundSec,
              },
            ]}
          >
            <Text style={[styles.calculateButtonText, { color: textColor }]}>
              الساعات
            </Text>
          </View>
          <View
            style={[
              styles.subjectName,
              {
                backgroundColor:
                  theme === "light"
                    ? Colors.lightBackgroundSec
                    : Colors.darkBackgroundSec,
              },
            ]}
          >
            <Text style={[styles.calculateButtonText, { color: textColor }]}>
              اسم المادة
            </Text>
          </View>
          <View
            style={[
              styles.subjectHG,
              {
                backgroundColor:
                  theme === "light"
                    ? Colors.lightBackgroundSec
                    : Colors.darkBackgroundSec,
              },
            ]}
          >
            <Text style={[styles.calculateButtonText, { color: textColor }]}>
              العلامة
            </Text>
          </View>
        </Animated.View>
        {numberToArray(subjectCount).map((_, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.duration(600).delay(index === 0 ? 1200 : 0)}
          >
            <SubjectRate
              setSelectedHour={setSelectedHour}
              setSelectedGrade={setSelectedGrade}
              itemNumber={index}
            />
          </Animated.View>
        ))}
        <Animated.View
          entering={FadeInUp.duration(600).delay(1400)}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            onPress={addSubject}
            style={styles.addSubjectButton}
          >
            <Text style={styles.calculateButtonText}>إضافة مادة</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteSubject} style={styles.deleteButton}>
            <Text style={styles.calculateButtonText}>حذف مادة</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
      <TouchableOpacity onPress={calculateRate} style={styles.calculateButton}>
        <Animated.Text
          entering={FadeInUp.duration(600).delay(1600)}
          style={styles.calculateButtonText}
        >
          حساب المعدل
        </Animated.Text>
      </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  gpa: {
    fontFamily: "TajawalBold",
    fontSize: moderateScale(16),
  },
  gpaToggle: {
    width: verticalScale(50),
    height: verticalScale(30),
    borderRadius: verticalScale(15),
    justifyContent: "center",
    textAlign: "left",
  },
  gpaToggleCircle: {
    width: verticalScale(30),
    height: verticalScale(30),
    borderRadius: verticalScale(15),
  },
  subjectHG: {
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
    width: (screenWidth - horizontalScale(174)) / 2 - 8,
  },
  subjectName: {
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(174 - 32),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(12),
  },
  addSubjectButton: {
    backgroundColor: "#ffc107",
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
  },
  deleteButton: {
    backgroundColor: "#CA0B00",
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
  },
  calculateButton: {
    backgroundColor: "#4BB543",
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(6),
  },
  calculateButtonText: {
    fontFamily: "Bukra",
    color: Colors.darkText,
    fontSize: moderateScale(16),
    textAlign: "left",
  },
});
