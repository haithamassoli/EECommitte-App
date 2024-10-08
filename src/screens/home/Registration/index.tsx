import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { moderateScale, verticalScale } from "@Utils/Platform";
import { ImageBackground } from "expo-image";
import { screenWidth } from "@Utils/Helper";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = StackScreenProps<HomeStackParamList, "Registration">;

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

const RegistrationScreen = ({ navigation }: Props) => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{ paddingBottom: verticalScale(12) }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: moderateScale(16),
          paddingTop: verticalScale(16),
        }}
      >
        {screenData.map((item, index) => (
          <Animated.View entering={FadeInUp.duration(600).delay(200 * index)}>
            <TouchableOpacity
              key={index}
              // @ts-ignore
              onPress={
                item.onPress != "SubjectName"
                  ? item.onPress
                  : () => navigation.navigate("SubjectName")
              }
              style={styles.button}
            >
              <ImageBackground
                source={item.image}
                contentFit="cover"
                style={styles.image}
              >
                <Text style={styles.title1} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.title2,
                    {
                      marginBottom: item.title ? 0 : verticalScale(32),
                    },
                  ]}
                >
                  {item.title2}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(24),
    overflow: "hidden",
  },
  image: {
    height: verticalScale(200),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginVertical: verticalScale(10),
    width: screenWidth / 2 - 20,
  },
  title1: {
    color: Colors.lightText,
    fontSize: moderateScale(40),
    fontFamily: "Bukra",
    textAlign: "center",
  },
  title2: {
    color: Colors.lightText,
    fontSize: moderateScale(22),
    fontFamily: "Bukra",
  },
});
