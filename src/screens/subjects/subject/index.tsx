import { useContext, useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Linking,
  ImageBackground,
  BackHandler,
  RefreshControl,
} from "react-native";
import type {
  StackScreenProps,
  StackNavigationProp,
} from "@react-navigation/stack";
import type { SubjectsStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Feather, AntDesign } from "@expo/vector-icons";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { screenHeight, screenWidth } from "@Utils/Helper";
import { FavoriteContext } from "@Src/store/favoriteContext";
import HeaderRight from "../HeaderRight";
import { fetchSubjectById } from "@Src/api/fetchSubjectById";
import NoConnection from "@Components/NoConnection";
import BannerAdmob from "@Components/BannerAdmob";

type Props = StackScreenProps<SubjectsStackParamList, "Subject">;
export type SubjectNavigationProp = StackNavigationProp<
  SubjectsStackParamList,
  "Subject"
>;

const firstFrame = require("@Assets/images/subjectColors/first.png");
const secondFrame = require("@Assets/images/subjectColors/second.png");
const thirdFrame = require("@Assets/images/subjectColors/third.png");
const sharedFrame = require("@Assets/images/subjectColors/shared.png");
const telecomFrame = require("@Assets/images/subjectColors/telecom.png");
const powerFrame = require("@Assets/images/subjectColors/power.png");
const firstDarkFrame = require("@Assets/images/subjectColors/firstDark.png");
const secondDarkFrame = require("@Assets/images/subjectColors/secondDark.png");
const thirdDarkFrame = require("@Assets/images/subjectColors/thirdDark.png");
const sharedDarkFrame = require("@Assets/images/subjectColors/sharedDark.png");
const telecomDarkFrame = require("@Assets/images/subjectColors/telecomDark.png");
const powerDarkFrame = require("@Assets/images/subjectColors/powerDark.png");

const SubjectScreen = ({ navigation, route }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { favorite, toggleFavorite } = useContext(FavoriteContext);
  const { data, isLoading, refetch, isFetching }: any = fetchSubjectById(
    route.params.subjectId,
    refetchCounter
  );
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;

  const subjectFrame =
    data?.color === "#F79606" && theme === "light"
      ? firstFrame
      : data?.color === "#F79606" && theme === "dark"
      ? firstDarkFrame
      : data?.color === "#F31313" && theme === "light"
      ? secondFrame
      : data?.color === "#F31313" && theme === "dark"
      ? secondDarkFrame
      : data?.color === "#0200CF" && theme === "light"
      ? thirdFrame
      : data?.color === "#0200CF" && theme === "dark"
      ? thirdDarkFrame
      : data?.color === "#29abef" && theme === "light"
      ? sharedFrame
      : data?.color === "#29abef" && theme === "dark"
      ? sharedDarkFrame
      : data?.color === "#AF02AB" && theme === "light"
      ? telecomFrame
      : data?.color === "#AF02AB" && theme === "dark"
      ? telecomDarkFrame
      : data?.color === "#272727" && theme === "light"
      ? powerFrame
      : powerDarkFrame;

  const backgroundSubjectColor = data?.color;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.name2 || "المادة",
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
          <Feather name="book" size={moderateScale(24)} color={textColor} />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <HeaderRight
            onPress={() => {
              navigation.getParent()?.navigate("HomeNavigation", {
                screen: "Search",
                params: {
                  backTo: "Subject",
                  subjectId: data?.id,
                  from: route.params?.from,
                },
              });
            }}
          />
        );
      },
    });
  }, [data?.name, theme]);

  useEffect(() => {
    const isFavorite = favorite.some((item) => item.id === data?.id);
    setIsFavorite(isFavorite);
  }, [favorite]);

  const backAction = () => {
    if (route.params?.from === "Home") {
      navigation.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name: "HomeNavigation" }],
      });
    } else {
      navigation.navigate("Plan");
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

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={theme === "light" ? Colors.primary700 : Colors.primary400}
      />
    );
  }
  if (Array.isArray(data) && data.length === 0) {
    return <NoConnection refetch={refetch} />;
  }
  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {
            if (refetchCounter === 0) {
              setRefetchCounter(1);
            }
          }}
        />
      }
    >
      <BannerAdmob position="top" />
      <ImageBackground
        resizeMode="contain"
        source={subjectFrame}
        style={{
          height: screenHeight < 650 ? verticalScale(268) : verticalScale(200),
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: moderateScale(24),
            color: Colors.darkText,
            fontFamily: "Bukra",
          }}
        >
          {data?.name2}
        </Text>
      </ImageBackground>
      <View
        style={{
          flex: 1,
          padding: moderateScale(10),
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            // @ts-ignore
            navigation.navigate("SubjectFullPost", {
              post: data?.aboutSubject,
              postTitle: "عن المادة",
            })
          }
          style={[style.button, { backgroundColor }]}
        >
          <Text style={[style.buttonText, { color: textColor }]}>
            التعريف بالمادة
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            // @ts-ignore
            navigation.navigate("SubjectFullPost", {
              post: data?.fullPost,
              postTitle: "البوست الشامل",
            })
          }
          style={[style.button, { backgroundColor }]}
        >
          <Text style={[style.buttonText, { color: textColor }]}>
            البوست الشامل
          </Text>
        </TouchableOpacity>
        {data?.book && (
          <TouchableOpacity
            onPress={() => data.book && Linking.openURL(data.book)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>الكتاب</Text>
          </TouchableOpacity>
        )}
        {data?.manual && (
          <TouchableOpacity
            onPress={() => data.manual && Linking.openURL(data.manual)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>المانيول</Text>
          </TouchableOpacity>
        )}
        {data?.prevYears && (
          <TouchableOpacity
            onPress={() => data.prevYears && Linking.openURL(data.prevYears)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>السنوات السابقة</Text>
          </TouchableOpacity>
        )}
        {data?.exams && (
          <TouchableOpacity
            onPress={() => data.exams && Linking.openURL(data.exams)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>الامتحانات</Text>
          </TouchableOpacity>
        )}
        {data?.slides && (
          <TouchableOpacity
            onPress={() => data.slides && Linking.openURL(data.slides)}
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>السلايدات</Text>
          </TouchableOpacity>
        )}
        {data?.explanations?.map((explanation: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              explanation.link && Linking.openURL(explanation.link)
            }
            style={[style.button, { backgroundColor: backgroundSubjectColor }]}
          >
            <Text style={[style.buttonText]}>{explanation.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() =>
            data?.subjectLink && Linking.openURL(data?.subjectLink)
          }
          style={[style.button, { backgroundColor: backgroundSubjectColor }]}
        >
          <Text style={[style.buttonText]}>درايف المادة</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          toggleFavorite({
            id: data?.id,
            name: data?.name2,
          });
        }}
        style={[
          style.button,
          {
            width: screenWidth - horizontalScale(32),
            backgroundColor,
            alignSelf: "center",
            marginVertical: verticalScale(10),
          },
        ]}
      >
        <Text style={[style.buttonText, { color: textColor }]}>
          {isFavorite ? "ازالة من المفضلة" : "اضافة الى المفضلة"}
        </Text>
        <AntDesign
          name={isFavorite ? "heart" : "hearto"}
          size={moderateScale(24)}
          color={textColor}
          style={{ marginHorizontal: horizontalScale(10) }}
        />
      </TouchableOpacity>
      <BannerAdmob position="bottom" />
    </ScrollView>
  );
};

export default SubjectScreen;

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    width: screenWidth / 2 - horizontalScale(32),
  },
  buttonText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    fontFamily: "TajawalMedium",
    color: Colors.darkText,
  },
});
