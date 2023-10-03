import { useLayoutEffect, useEffect } from "react";
import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import { useColorScheme } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { WebDisplay } from "@Components/webDisplay";
import { moderateScale, horizontalScale } from "@Utils/Platform";
import HeaderRight from "../HeaderRight";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectFullPost">;

const SubjectFullPostScreen = ({ navigation, route }: Props) => {
  const { theme } = useColorScheme();
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.postTitle,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingStart: horizontalScale(12),
          }}
        >
          <Feather
            name="arrow-right"
            size={moderateScale(24)}
            color={textColor}
          />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <HeaderRight
            onPress={() => {
              navigation.navigate("Search");
            }}
          />
        );
      },
    });
  }, [route?.params, theme]);

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      {route?.params?.post ? (
        <Animated.View entering={FadeInUp.duration(600)}>
          <WebDisplay html={route?.params?.post} />
        </Animated.View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: textColor,
              textAlign: "center",
              fontSize: moderateScale(20),
              fontFamily: "TajawalBold",
            }}
          >
            {route?.params?.postTitle === "البوست الشامل"
              ? "لا يوجد بوست شامل حاليًا"
              : "لا يوجد تعريف للمادة"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SubjectFullPostScreen;
