import { useContext, useLayoutEffect, useEffect } from "react";
import {
  Text,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  View,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { WebDisplay } from "@Components/webDisplay";
import { moderateScale, horizontalScale } from "@Utils/Platform";
import HeaderRight from "../HeaderRight";
import { Feather } from "@expo/vector-icons";
import BannerAdmob from "@Components/BannerAdmob";

type Props = StackScreenProps<SubjectsStackParamList, "SubjectFullPost">;

const SubjectFullPostScreen = ({ navigation, route }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route?.params?.postTitle,
      headerLeft: () => (
        <TouchableOpacity
          onPress={backAction}
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
  }, [route?.params, theme]);

  const backAction = () => {
    if (route?.params?.from === "Search") {
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name: "SubjectsNavigation" }],
      });
    } else {
      navigation.goBack();
    }

    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <BannerAdmob position="top" />
      {route?.params?.post ? (
        <WebDisplay html={route?.params?.post} />
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
      <BannerAdmob position="bottom" />
    </ScrollView>
  );
};

export default SubjectFullPostScreen;
