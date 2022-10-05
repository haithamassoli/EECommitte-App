import {
  Linking,
  Share,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import InfoItem from "@Components/infoItem";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useLayoutEffect } from "react";
import Colors from "@GlobalStyle/Colors";
import { Feather } from "@expo/vector-icons";

type Props = StackScreenProps<InfoStackParamList, "Info">;

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
              paddingEnd: horizontalScale(10),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.getParent()?.navigate("HomeNavigation", {
                  screen: "Search",
                  params: {
                    backTo: "Info",
                  },
                });
              }}
            >
              <Feather
                name="search"
                size={moderateScale(24)}
                color={textColor}
                style={{ paddingStart: horizontalScale(10) }}
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
