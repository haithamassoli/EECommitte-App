import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
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
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundSubjectColor,
          borderRadius: moderateScale(30),
          padding: moderateScale(10),
          marginHorizontal: horizontalScale(30),
          marginVertical: verticalScale(20),
          paddingStart: horizontalScale(12),
          height: moderateScale(300),
        }}
      >
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: moderateScale(24),
            color: textColor,
            fontFamily: "Bukra",
            paddingStart: horizontalScale(12),
          }}
        >
          {subject?.name}
        </Text>
      </View>
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
          onPress={
            () =>
              // @ts-ignore
              navigation.navigate("SubjectFullPost", {
                post: subject?.aboutSubject,
                postTitle: "عن المادة",
              })

            // {subject?.aboutSubject && <WebDisplay html={subject?.aboutSubject} />}
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
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.book })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>الكتاب</Text>
          </TouchableOpacity>
        )}
        {subject.prevYears && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.prevYears })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              السنوات السابقة
            </Text>
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
            <Text style={[style.buttonText, { color: textColor }]}>
              الموضوع كاملا
            </Text>
          </TouchableOpacity>
        )}
        {subject.exams && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.exams })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              الامتحانات
            </Text>
          </TouchableOpacity>
        )}
        {subject.notebook && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.notebook })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              الدفتر المدرسي
            </Text>
          </TouchableOpacity>
        )}
        {subject.slides && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.slides })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              الشرائح
            </Text>
          </TouchableOpacity>
        )}
        {subject?.explanations?.map((explanation, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("SubjectWebView", { url: explanation.link })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              {explanation.name}
            </Text>
          </TouchableOpacity>
        ))}
        {subject.aboutSubject && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SubjectWebView", {
                // @ts-ignore
                url: subject.aboutSubject,
              })
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText, { color: textColor }]}>
              عن المادة
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SubjectWebView", {
              url: subject.subjectLink,
            })
          }
          style={[style.button, { backgroundColor: backgroundSubjectColor }]}
        >
          <Text style={[style.buttonText, { color: textColor }]}>
            درايف المادة
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // return (
  //   <>
  //     {loading}
  //     <ScrollView
  //       style={{
  //         flex: 1,
  //         paddingHorizontal: horizontalScale(12,
  //         paddingVertical: verticalScale(4,
  //       }}
  //     >
  //       <Text
  //         style={{
  //           color: textColor,
  //           fontSize: 24,
  //           fontWeight: "bold",
  //         }}
  //       >
  //         {subject?.name2}
  //       </Text>
  //       <View
  //         style={{
  //           marginTop: verticalScale(16,
  //         }}
  //       >
  //         {subject?.aboutSubject && <WebDisplay html={subject?.aboutSubject} />}
  //       </View>
  //       <TouchableOpacity
  //         onPress={() =>
  //           navigation.navigate("SubjectWebView", { url: subject?.subjectLink })
  //         }
  //         style={{
  //           backgroundColor:
  //             theme === "light" ? Colors.primary700 : Colors.primary400,
  //           padding: 8,
  //           borderRadius: moderateScale(8,
  //           marginVertical: 8,
  //         }}
  //       >
  //         <Text
  //           style={{
  //             color: Colors.lightText,
  //           }}
  //         >
  //           Drive Link
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity
  //         onPress={() =>
  //           navigation.navigate("SubjectFullPost", { post: subject?.fullPost })
  //         }
  //         style={{
  //           backgroundColor:
  //             theme === "light" ? Colors.primary400 : Colors.primary700,
  //           padding: 8,
  //           borderRadius: moderateScale(8,
  //           marginVertical: 8,
  //         }}
  //       >
  //         <Text
  //           style={{
  //             color: Colors.lightText,
  //           }}
  //         >
  //           Show Full Post
  //         </Text>
  //       </TouchableOpacity>
  //     </ScrollView>
  //   </>
  // );
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
  },
});
