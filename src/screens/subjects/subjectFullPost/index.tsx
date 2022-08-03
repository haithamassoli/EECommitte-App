import { useContext, useLayoutEffect } from "react";
import { Text, ScrollView } from "react-native";
import RenderHtml from "react-native-render-html";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import { rtlWebview, screenWidth } from "@Utils/Helper";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

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
      style={{
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 4,
      }}
    >
      {route?.params?.post ? (
        <>
          <RenderHtml
            contentWidth={screenWidth}
            source={{
              html: rtlWebview(route.params.post),
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
              img:{
                display: "none",
              },
              a:{
                color: theme === "light" ? Colors.primary700 : Colors.primary400,
              }
            }}
          />
        </>
      ) : (
        <Text style={{color: textColor}}>لا يوجد يوست شامل حاليًا</Text>
      )}
    </ScrollView>
  );
};

export default SubjectFullPostScreen;
