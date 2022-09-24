import { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
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
import { horizontalScale, moderateScale } from "@Utils/Platform";

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
    <>
      {loading}
      <View
        style={{
          flex: 1,
          padding: moderateScale(10),
        }}
      >
        {subject.book && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.book })
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>الكتاب</Text>
          </TouchableOpacity>
        )}
        {subject.prevYears && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.prevYears })
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>السنوات السابقة</Text>
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
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>الموضوع كاملا</Text>
          </TouchableOpacity>
        )}
        {subject.exams && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.exams })
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>الامتحانات</Text>
          </TouchableOpacity>
        )}
        {subject.notebook && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.notebook })
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>الدفتر المدرسي</Text>
          </TouchableOpacity>
        )}
        {subject.slides && (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigation.navigate("SubjectWebView", { url: subject.slides })
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>الشرائح</Text>
          </TouchableOpacity>
        )}
        {subject?.explanations?.map((explanation, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("SubjectWebView", { url: explanation.link })
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>{explanation.name}</Text>
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
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingStart: horizontalScale(12),
            }}
          >
            <Text style={{ color: textColor }}>عن المادة</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SubjectWebView", {
              url: subject.subjectLink,
            })
          }
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingStart: horizontalScale(12),
          }}
        >
          <Text style={{ color: textColor }}>الموقع الرسمي</Text>
        </TouchableOpacity>
      </View>
    </>
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
