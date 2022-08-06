import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
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
import { WebDisplay } from "@Components/webDisplay";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;
export type SubjectNavigationProp = StackNavigationProp<
  SubjectsStackParamList,
  "Subject"
>;
const SubjectScreen = ({ navigation, route }: Props) => {
  const [subject, setSubject] = useState({} as Subject);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
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
      headerTitle: subject?.name,
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
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 12,
          paddingVertical: 4,
        }}
      >
        <Text
          style={{
            color: textColor,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {subject?.name2}
        </Text>
        <View
          style={{
            marginTop: 16,
          }}
        >
          {subject?.aboutSubject && <WebDisplay html={subject?.aboutSubject} />}
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("SubjectWebView", { url: subject?.subjectLink })
          }
          style={{
            backgroundColor:
              theme === "light" ? Colors.primary700 : Colors.primary400,
            padding: 8,
            borderRadius: 8,
            marginVertical: 8,
          }}
        >
          <Text
            style={{
              color: Colors.dark,
            }}
          >
            Drive Link
          </Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("SubjectFullPost", { post: subject?.fullPost })
          }
          style={{
            backgroundColor:
              theme === "light" ? Colors.primary400 : Colors.primary700,
            padding: 8,
            borderRadius: 8,
            marginVertical: 8,
          }}
        >
          <Text
            style={{
              color: Colors.dark,
            }}
          >
            Show Full Post
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default SubjectScreen;
