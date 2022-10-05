import { useContext, useLayoutEffect } from "react";
import { Text, ScrollView } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { WebDisplay } from "@Components/webDisplay";
import { screenHeight } from "@Utils/Helper";
import { verticalScale, moderateScale } from "@Utils/Platform";
import HeaderRight from "../HeaderRight";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectFullPost">;

const SubjectFullPostScreen = ({ navigation, route }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.postTitle,
      headerRight: () => {
        return (
          <HeaderRight
            onPress={() => {
              navigation.getParent()?.navigate("HomeNavigation", {
                screen: "Search",
                params: {
                  backTo: "SubjectFullPost",
                  postTitle: route?.params?.postTitle,
                  post: route?.params?.post,
                },
              });
            }}
          />
        );
      },
    });
  }, [route?.params]);
  return (
    <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
      {route?.params?.post ? (
        <WebDisplay html={route?.params?.post} />
      ) : (
        <Text
          style={{
            color: textColor,
            textAlign: "center",
            textAlignVertical: "center",
            height: screenHeight - verticalScale(200),
            fontSize: moderateScale(20),
            fontFamily: "TajawalBold",
          }}
        >
          {route?.params?.postTitle === "البوست الشامل"
            ? "لا يوجد بوست شامل حاليًا"
            : "لا يوجد تعريف للمادة"}
        </Text>
      )}
    </ScrollView>
  );
};

export default SubjectFullPostScreen;
