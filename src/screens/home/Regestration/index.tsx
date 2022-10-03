import {
  ScrollView,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { screenWidth } from "@Utils/Helper";
import { moderateScale, verticalScale } from "@Utils/Platform";

type Props = StackScreenProps<HomeStackParamList, "Favorite">;

const screenData = [
  {
    image: require("@Assets/images/registraion/web.webp"),
    title: "موقع",
    title2: "التسجيل",
    onPress: () =>
      Linking.openURL("https://services.just.edu.jo/sturegistration/"),
  },
  {
    image: require("@Assets/images/registraion/table.webp"),
    title: "الجدول",
    title2: "الدراسي",
    onPress: () =>
      Linking.openURL("https://services.just.edu.jo/courseschedule/"),
  },
  {
    image: require("@Assets/images/registraion/registerwithEE.webp"),
    title: "طريقة",
    title2: "التسجيل",
    onPress: () => Linking.openURL("https://youtu.be/HHbm4bbsrj0"),
  },
  {
    image: require("@Assets/images/registraion/subjectname.webp"),
    title: "الأسماء",
    title2: "الشائعة للمواد",
    onPress: "SubjectName",
  },
  {
    image: require("@Assets/images/registraion/studantService.webp"),
    title: "خدمات",
    title2: "الطالب",
    onPress: () => Linking.openURL("https://services.just.edu.jo/stuservices/"),
  },
  {
    image: require("@Assets/images/registraion/Elearning.webp"),
    title2: "Elearning",
    onPress: () => Linking.openURL("https://learn.ejust.org/"),
  },
];

const RegestrationScreen = ({ navigation }: Props) => {
  const textColor = Colors.lightText;

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {screenData.map((item, index) => (
          <TouchableOpacity
            key={index}
            // @ts-ignore
            onPress={
              item.onPress != "SubjectName"
                ? item.onPress
                : () => navigation.navigate("SubjectName")
            }
            style={{
              borderRadius: moderateScale(24),
              overflow: "hidden",
            }}
          >
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={{
                height: verticalScale(200),
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginVertical: verticalScale(10),
                width: screenWidth / 2 - 20,
              }}
            >
              <Text
                style={{
                  color: textColor,
                  fontSize: moderateScale(40),
                  fontFamily: "Bukra",
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: textColor,
                  fontSize: moderateScale(22),
                  fontFamily: "Bukra",
                  marginBottom: item.title ? 0 : verticalScale(32),
                }}
              >
                {item.title2}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default RegestrationScreen;
