import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import Colors from "@GlobalStyle/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { ImageBackground } from "expo-image";

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
  const { width, height } = useWindowDimensions();
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
              style={[
                styles.image,
                {
                  width:
                    width > height
                      ? width / 2 - horizontalScale(80)
                      : width / 2 - horizontalScale(20),
                },
              ]}
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
