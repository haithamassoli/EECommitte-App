import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { screenWidth } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext } from "react";
import { View, Text, TouchableOpacity, Linking, Image } from "react-native";

type Props = Omit<Record, "id" | "searchName">;

const RecordCard = ({ link, image, subject, doctor }: Props) => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: verticalScale(12),
      }}
      onPress={() => Linking.openURL(link)}
    >
      <Image
        style={{
          width: screenWidth * 0.42,
          height: verticalScale(110),
        }}
        resizeMode="contain"
        source={{ uri: image }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          padding: moderateScale(10),
          backgroundColor,
          height: verticalScale(110),
          marginStart: horizontalScale(10),
        }}
      >
        <Text
          style={{
            fontSize: moderateScale(16),
            fontFamily: "TajawalBold",
            textAlign: "left",
            color: textColor,
          }}
        >
          {subject}
        </Text>
        <Text
          style={{
            fontSize: moderateScale(16),
            fontFamily: "TajawalMedium",
            color: textColor,
          }}
        >
          {doctor}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecordCard;
