import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { screenWidth } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet,
} from "react-native";

type Props = Omit<Record, "id" | "searchName">;

const RecordCard = ({ link, image, subject, doctor }: Props) => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(link)}
    >
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: image }}
        defaultSource={require("@Assets/images/bookPlacholder.jpg")}
      />
      <View style={[styles.textContainer, { backgroundColor }]}>
        <Text style={[styles.subject, { color: textColor }]}>{subject}</Text>
        <Text style={[styles.doctor, { color: textColor }]}>{doctor}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecordCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(12),
  },
  image: {
    width: screenWidth * 0.42,
    height: verticalScale(110),
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: moderateScale(10),
    height: verticalScale(110),
    marginStart: horizontalScale(10),
  },
  subject: {
    fontSize: moderateScale(16),
    fontFamily: "TajawalBold",
    textAlign: "left",
  },
  doctor: {
    fontSize: moderateScale(16),
    fontFamily: "TajawalMedium",
    textAlign: "left",
  },
});
