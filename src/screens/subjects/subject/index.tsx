import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import subjects from "@Src/data/Subjects";
import type { StackScreenProps } from "@react-navigation/stack";
import type { Subject } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;

const SubjectScreen = ({ navigation, route }: Props) => {
  const [subject, setSubject] = useState({} as Subject);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    const currentSubject = subjects.find(
      (subject) => subject.id === route.params.areaId
    );
    if (currentSubject) {
      setSubject(currentSubject);
    }
  }, [route?.params?.areaId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: subject?.name,
    });
  }, [subject?.name]);

  return (
    <View
      style={{
        flex: 1,
        paddingStart: 12,
        paddingVertical: 4,
      }}
    >
      <Text
        style={{
          color:
            theme === "light" ? Colors.lightTextColor : Colors.darkTextColor,
        }}
      >
        {subject?.name}
      </Text>
      <Text
        style={{
          color:
            theme === "light" ? Colors.lightTextColor : Colors.darkTextColor,
        }}
      >
        {subject?.name2}
      </Text>
      <Pressable
        onPress={() =>
          navigation.navigate("SubjectWebView", { url: subject?.subjectLink })
        }
      >
        <Text
          style={{
            color:
              theme === "light" ? Colors.lightTextColor : Colors.darkTextColor,
          }}
        >
          Drive Link
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("SubjectFullPost", { post: subject?.fullPost })
        }
      >
        <Text
          style={{
            color:
              theme === "light" ? Colors.lightTextColor : Colors.darkTextColor,
          }}
        >
          Show Full Post
        </Text>
      </Pressable>
    </View>
  );
};

export default SubjectScreen;
