import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Linking,
  ImageBackground,
} from "react-native";
import subjects from "@Src/data/Subjects";
import type {
  StackScreenProps,
  StackNavigationProp,
} from "@react-navigation/stack";
import type { Subject } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Feather } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { screenWidth } from "@Utils/Helper";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;
export type SubjectNavigationProp = StackNavigationProp<
  SubjectsStackParamList,
  "Subject"
>;
const SubjectScreen = ({ navigation, route }: Props) => {
  const [subject, setSubject] = useState({} as Subject);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;
  const backgroundSubjectColor = subject.color;
  useEffect(() => {
    setLoading(true);
    const currentSubject = subjects.find(
      (subject) => subject.id === route.params.subjectId
    );
    if (currentSubject) {
      setSubject(currentSubject);
    }
    setLoading(false);
  }, [route?.params?.subjectId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: subject?.name2,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.replace("Plan")}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingStart: horizontalScale(12),
          }}
        >
          <Feather
            name="arrow-right"
            size={moderateScale(24)}
            color={textColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [subject?.name]);

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color={Colors.gray} />
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading}
      <ImageBackground
        source={require("@Assets/images/telecomFrame.png")}
        style={{
          width: screenWidth,
          height: verticalScale(220),
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundSubjectColor,
            borderRadius: moderateScale(30),
            padding: moderateScale(10),
            marginHorizontal: horizontalScale(30),
            marginVertical: verticalScale(20),
            paddingStart: horizontalScale(12),
            height: moderateScale(200),
            zIndex: 10,
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
              fontSize: moderateScale(24),
              color: Colors.darkText,
              fontFamily: "Bukra",
              paddingStart: horizontalScale(12),
            }}
          >
            {subject?.name2}
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          padding: moderateScale(10),
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            // @ts-ignore
            navigation.navigate("SubjectFullPost", {
              post: subject?.aboutSubject,
              postTitle: "عن المادة",
            })
          }
          style={[style.button, { backgroundColor }]}
        >
          <Text style={[style.buttonText, { color: textColor }]}>
            التعريف بالمادة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            // @ts-ignore
            navigation.navigate("SubjectFullPost", {
              post: subject?.fullPost,
              postTitle: "البوست الشامل",
            })
          }
          style={[style.button, { backgroundColor }]}
        >
          <Text style={[style.buttonText, { color: textColor }]}>
            البوست الشامل
          </Text>
        </TouchableOpacity>
        {subject.book && (
          <TouchableOpacity
            onPress={() => subject.book && Linking.openURL(subject.book)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>الكتاب</Text>
          </TouchableOpacity>
        )}
        {subject.prevYears && (
          <TouchableOpacity
            onPress={() =>
              subject.prevYears && Linking.openURL(subject.prevYears)
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>السنوات السابقة</Text>
          </TouchableOpacity>
        )}
        {subject.fullPost && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SubjectFullPost", {
                // @ts-ignore
                subjectId: subject.id,
              })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>البوست الشامل</Text>
          </TouchableOpacity>
        )}
        {subject.exams && (
          <TouchableOpacity
            onPress={() => subject.exams && Linking.openURL(subject.exams)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>الامتحانات</Text>
          </TouchableOpacity>
        )}
        {subject.notebook && (
          <TouchableOpacity
            onPress={() =>
              subject.notebook && Linking.openURL(subject.notebook)
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>الدفاتر</Text>
          </TouchableOpacity>
        )}
        {subject.slides && (
          <TouchableOpacity
            onPress={() => subject.slides && Linking.openURL(subject.slides)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>الشرائح</Text>
          </TouchableOpacity>
        )}
        {subject?.explanations?.map((explanation, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              explanation.link && Linking.openURL(explanation.link)
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>{explanation.name}</Text>
          </TouchableOpacity>
        ))}
        {subject.aboutSubject && (
          <TouchableOpacity
            onPress={() =>
              subject.aboutSubject && Linking.openURL(subject.aboutSubject)
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>عن المادة</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            subject.subjectLink && Linking.openURL(subject.subjectLink)
          }
          style={[style.button, { backgroundColor: backgroundSubjectColor }]}
        >
          <Text style={[style.buttonText]}>درايف المادة</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SubjectScreen;

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    margin: moderateScale(10),
    width: screenWidth / 2 - moderateScale(32),
  },
  buttonText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: "TajawalMedium",
    color: Colors.darkText,
  },
});
