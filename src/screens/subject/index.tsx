import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import subjects from "../../data/Subjects";
import type { StackScreenProps } from "@react-navigation/stack";
import type { Subject } from "../../types";
import type { SubjectsStackParamList } from "../../types/navigation";
import { rtlWebview } from "../../utils/Helper";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;

const SubjectScreen = ({ navigation, route }: Props) => {
  const [subject, setSubject] = useState({} as Subject);

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
    <View style={{ flex: 1, paddingStart: 12, paddingVertical: 4, backgroundColor: 'white' }}>
      {/* <Text>{subject?.name}</Text>
      <Text>{subject?.name2}</Text> */}
      {subject?.fullPost ? (
        <WebView
          minimumFontSize={72}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          originWhitelist={["*"]}
          source={{
            html: rtlWebview(subject.fullPost),
          }}
        />
      ): (
        <Text>لا يوجد يوست شامل حاليًا</Text>
      )}
      {/* <Text>{subject?.subjectLink}</Text> */}
    </View>
  );
};

export default SubjectScreen;
