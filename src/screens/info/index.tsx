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
  function onPress(page: keyof InfoStackParamList) {
    navigation.navigate(page)
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <InfoItem
          icon="user"
          title="Profile Information"
          subTitle="Change your account information"
          onPress={() => onPress("AboutUni")}
        />
        <InfoItem
          icon="star"
          title="Adress"
          subTitle="Add your delivery location"
          onPress={() => onPress("Doctors")}
        />
        <InfoItem
          icon="share"
          title="Refer and Share App"
          subTitle="Change your account information"
          onPress={() => onPress("Doctors")}
        />
        <InfoItem
          icon="info"
          title="FAQ"
          subTitle="Frequently asked questions"
          onPress={() => onPress("Doctors")}
        />
        <InfoItem
          icon="heart"
          title="Support US"
          subTitle="Help us to improve our app"
          onPress={() => onPress("SupportUs")}
        />
        <InfoItem
          icon="star"
          title="Rate Us"
          subTitle="Rate us on the app store"
          onPress={() => onPress("Info")}
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
