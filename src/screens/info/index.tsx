import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import InfoItem from "@Components/infoItem";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";

type Props = StackScreenProps<InfoStackParamList>;

const InfoScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
  const onPress = (page: keyof InfoStackParamList) => {
    navigation.push(page);
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoItem
          icon="info"
          title="عن اللجنة"
          subTitle="لجنة الهندسة الكهربائية"
          onPress={() => onPress("AboutEECommitte")}
        />
        <InfoItem
          icon="mail"
          title="تواصل معنا"
          subTitle=""
          onPress={() => onPress("ContactUs")}
        />
        <InfoItem
          icon="user"
          title="الكادر التدريسي"
          subTitle="معلومات عن الكادر التدريسي"
          onPress={() => onPress("Doctors")}
        />
        <InfoItem
          icon="share-2"
          title="روابط مهمة"
          subTitle=""
          onPress={() => onPress("QuickLinkes")}
        />
        <InfoItem
          icon="heart"
          title="ادعمنا"
          subTitle="ساعدنا على تطوير التطبيق"
          onPress={() => onPress("SupportUs")}
        />
      </ScrollView>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
  },
});
