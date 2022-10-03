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
import { screenHeight, screenWidth } from "@Utils/Helper";
import { FavoriteContext } from "@Src/store/favoriteContext";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;
export type SubjectNavigationProp = StackNavigationProp<
  SubjectsStackParamList,
  "Subject"
>;

const firstFrame = require("@Assets/images/subjectColors/first.png");
const secondFrame = require("@Assets/images/subjectColors/second.png");
const thirdFrame = require("@Assets/images/subjectColors/third.png");
const sharedFrame = require("@Assets/images/subjectColors/shared.png");
const telecomFrame = require("@Assets/images/subjectColors/telecom.png");
const powerFrame = require("@Assets/images/subjectColors/power.png");
const firstDarkFrame = require("@Assets/images/subjectColors/firstDark.png");
const secondDarkFrame = require("@Assets/images/subjectColors/secondDark.png");
const thirdDarkFrame = require("@Assets/images/subjectColors/thirdDark.png");
const sharedDarkFrame = require("@Assets/images/subjectColors/sharedDark.png");
const telecomDarkFrame = require("@Assets/images/subjectColors/telecomDark.png");
const powerDarkFrame = require("@Assets/images/subjectColors/powerDark.png");

const SubjectScreen = ({ navigation, route }: Props) => {
  const [subject, setSubject] = useState({} as Subject);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { favorite, toggleFavorite } = useContext(FavoriteContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const subjectFrame =
    subject.color === "#F79606" && theme === "light"
      ? firstFrame
      : subject.color === "#F79606" && theme === "dark"
      ? firstDarkFrame
      : subject.color === "#F31313" && theme === "light"
      ? secondFrame
      : subject.color === "#F31313" && theme === "dark"
      ? secondDarkFrame
      : subject.color === "#0200CF" && theme === "light"
      ? thirdFrame
      : subject.color === "#0200CF" && theme === "dark"
      ? thirdDarkFrame
      : subject.color === "#29abef" && theme === "light"
      ? sharedFrame
      : subject.color === "#29abef" && theme === "dark"
      ? sharedDarkFrame
      : subject.color === "#AF02AB" && theme === "light"
      ? telecomFrame
      : subject.color === "#AF02AB" && theme === "dark"
      ? telecomDarkFrame
      : subject.color === "#272727" && theme === "light"
      ? powerFrame
      : powerDarkFrame;

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
  }, [subject?.name, theme]);

  useEffect(() => {
    const isFavorite = favorite.some((item) => item.id === subject.id);
    setIsFavorite(isFavorite);
  }, [favorite]);

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color={textColor} />
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading}
      <ImageBackground
        resizeMode="contain"
        source={subjectFrame}
        style={{
          height: screenHeight < 650 ? verticalScale(268) : verticalScale(200),
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
          }}
        >
          {subject?.name2}
        </Text>
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
            <Text style={[style.buttonText]}>السلايدات</Text>
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
      <TouchableOpacity
        onPress={() => {
          toggleFavorite({
            id: subject.id,
            name: subject.name2,
          });
        }}
        style={[style.button, { width: "100%", backgroundColor }]}
      >
        <Text style={[style.buttonText, { color: textColor }]}>
          {isFavorite ? "ازالة من المفضلة" : "اضافة الى المفضلة"}
        </Text>
      </TouchableOpacity>
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
