import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import subjects from "../../data/Subjects.json";
import { Subject } from "../../types";

const SubjectScreen = ({ route }: any) => {
const [subject, setSubject] = useState<Subject | undefined>({} as Subject);

  useEffect(() => {
    const currentSubject = subjects.find((subject) => subject.id === route.params.areaId);
    setSubject(currentSubject);
  }, [])

    return (
    <View>
      <Text>{subject?.name}</Text>
      <Text>{subject?.name2}</Text>
      <Text>{subject?.subjectLink}</Text>
    </View>
  );
};

export default SubjectScreen;
