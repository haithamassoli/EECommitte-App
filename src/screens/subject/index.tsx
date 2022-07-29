import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import subjects from "../../data/Subjects.json";
import type { StackScreenProps } from "@react-navigation/stack";
import type { Subject } from "../../types";
import type { SubjectsStackParamList } from "../../types/navigation";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;

const SubjectScreen = ({ navigation, route }: Props) => {
  const [subject, setSubject] = useState<Subject | undefined>({} as Subject);

  useEffect(() => {
    const currentSubject = subjects.find(
      (subject) => subject.id === route.params.areaId
    );
    setSubject(currentSubject);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <View>
      <Text>{subject?.name}</Text>
      <Text>{subject?.name2}</Text>
      <Text>{subject?.subjectLink}</Text>
    </View>
  );
};

export default SubjectScreen;
