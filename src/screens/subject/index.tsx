import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import subjects from "../../data/Subjects.json";
import type { StackScreenProps } from "@react-navigation/stack";
import type { Subject } from "../../types";
import type { SubjectsStackParamList } from "../../types/navigation";

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
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Text>{subject?.name}</Text>
      <Text>{subject?.name2}</Text>
      <WebView
        source={{
          html: '<h1 style="color:red"><center>Hello world</center></h1><h1>Haitham</h1><p>Haitham</p>',
        }}
      />

      <Text>{subject?.subjectLink}</Text>
    </View>
  );
};

export default SubjectScreen;
