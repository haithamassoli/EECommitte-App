import { useContext, useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import RenderHtml from "react-native-render-html";
import subjects from "@Src/data/Subjects";
import type { StackScreenProps } from "@react-navigation/stack";
import type { Subject } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { rtlWebview, screenWidth } from "@Utils/Helper";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;

const SubjectScreen = ({ navigation, route }: Props) => {
  const [subject, setSubject] = useState({} as Subject);
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
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
        {subject?.aboutSubject && (
          <RenderHtml
            contentWidth={screenWidth}
            source={{
              html: rtlWebview(subject?.aboutSubject),
            }}
            tagsStyles={{
              p: {
                fontSize: 18,
                lineHeight: 24,
                fontFamily: "Roboto",
                fontWeight: "normal",
                fontStyle: "normal",
                color: textColor,
              },
              a: {
                color:
                  theme === "light" ? Colors.primary700 : Colors.primary400,
              },
            }}
          />
        )}
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
  );
};

export default SubjectScreen;
