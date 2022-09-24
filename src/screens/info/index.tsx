import { StyleSheet, View } from "react-native";
import InfoItem from "@Components/infoItem";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";

type Props = StackScreenProps<InfoStackParamList>;

const InfoScreen = ({ navigation }: Props) => {
  const onPress = (page: keyof InfoStackParamList) => {
    navigation.push(page);
  };
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    marginTop: verticalScale(20),
    textAlign: "left",
  },
});
