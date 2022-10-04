import { Linking, Share, StyleSheet, View } from "react-native";
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
        icon="smartphone"
        title="تطبيق Engineers"
        subTitle="كل ما يهم طالب السنة الأولى في الهندسة والعلوم"
        onPress={() =>
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=com.taimaah.edu"
          )
        }
      />
      <InfoItem
        icon="mail"
        title="تواصل معنا"
        subTitle="للملاحظات والاقتراحات"
        onPress={() =>
          Linking.openURL(
            "mailto:haitham.b.assoli@gmail.com?subject=تطبيق لجنة الهندسة الكهربائية&body=مرحباً هيثم،"
          )
        }
      />
      <InfoItem
        icon="share"
        title="شارك التطبيق"
        subTitle="شارك التطبيق مع أصدقائك"
        onPress={() =>
          Share.share({
            message:
              "https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte",
          })
        }
      />
      <InfoItem
        icon="star"
        title="قيم التطبيق"
        subTitle="قيم التطبيق على متجر جوجل بلاي"
        onPress={() =>
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte"
          )
        }
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
