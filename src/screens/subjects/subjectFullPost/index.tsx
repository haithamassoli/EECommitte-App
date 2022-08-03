import { useContext, useLayoutEffect } from "react";
import { Text, ScrollView } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import { rtlWebview, screenWidth } from "@Utils/Helper";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { WebDisplay } from "@Components/webDisplay";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectFullPost">;

const SubjectFullPostScreen = ({ navigation, route }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "البوست الشامل",
    });
  }, []);
  return (
    <ScrollView
    >
      {route?.params?.post ? (
        <WebDisplay html={route?.params?.post} />
      ) : (
        <Text style={{ color: textColor }}>لا يوجد يوست شامل حاليًا</Text>
      )}
    </ScrollView>
  );
};

export default SubjectFullPostScreen;
