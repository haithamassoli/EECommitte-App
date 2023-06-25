import {
  Linking,
  Share,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import InfoItem from "@Components/infoItem";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";
import {
  horizontalScale,
  isIOS,
  moderateScale,
  verticalScale,
} from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useLayoutEffect } from "react";
import Colors from "@GlobalStyle/Colors";
import { Feather } from "@expo/vector-icons";

type Props = StackScreenProps<InfoStackParamList, "Info">;

const appUrl = isIOS
  ? "https://apps.apple.com/us/app/eecommittee/id6443760623"
  : "https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte";
const InfoScreen = ({ navigation }: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "القائمة",
      headerRight: () => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingRight: horizontalScale(16),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <Feather
                name="search"
                size={moderateScale(24)}
                color={textColor}
                style={{ paddingHorizontal: horizontalScale(12) }}
              />
            </TouchableOpacity>
            {theme === "light" ? (
              <TouchableOpacity onPress={() => toggleTheme()}>
                <Feather
                  name="moon"
                  size={moderateScale(24)}
                  color={textColor}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => toggleTheme()}>
                <Feather
                  name="sun"
                  size={moderateScale(24)}
                  color={textColor}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      },
    });
  }, [theme]);
  const onPress = (page: keyof InfoStackParamList) => {
    navigation.push(page);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <InfoItem
          icon="info"
          title="عن اللجنة"
          subTitle="لجنة الهندسة الكهربائية"
          onPress={() => onPress("AboutEECommitte")}
        />
        <InfoItem
          icon="smartphone"
          title="تطبيق Engineers"
          subTitle="كل ما يهم طالب الهندسة في السنة الأولى"
          onPress={() =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.taimaah.edu"
            )
          }
        />
        <InfoItem
          icon="mail"
          title="تواصل مع المطور"
          subTitle="للملاحظات والإقتراحات"
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
              message: `تطبيق لجنة الهندسة الكهربائية على الاندرويد
https://play.google.com/store/apps/details?id=com.haithamassoli.EECommitte
            
تطبيق لجنة الهندسة الكهربائية على الايفون
https://apps.apple.com/us/app/eecommittee/id6443760623`,
            })
          }
        />
        <InfoItem
          icon="star"
          title="قيم التطبيق"
          subTitle={
            isIOS ? "قيم التطبيق على الأب ستور" : "قيم التطبيق على جوجل بلاي"
          }
          onPress={() => Linking.openURL(appUrl)}
        />
        <InfoItem
          icon="heart"
          title="ادعمنا"
          subTitle="ساعدنا على تطوير التطبيق"
          onPress={() => onPress("SupportUs")}
        />
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
  },
  content: {
    flex: 1,
    paddingBottom: verticalScale(16),
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    marginTop: verticalScale(20),
    textAlign: "left",
  },
});
