import Colors from "@GlobalStyle/Colors";
import { screenWidth } from "@Utils/Helper";
import { View, Text } from "react-native";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";

type Props = {
  title: string;
  rate: number;
  grade: string;
};

const CardRate = ({ title, rate, grade }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View
      style={{
        backgroundColor: Colors.lightBackgroundSec,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth / 2 - 20,
      }}
    >
      <Text
        style={{
          fontFamily: "Bukra",
          color: textColor,
          fontSize: 16,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: "TajawalBold",
          color: textColor,
          fontSize: 46,
        }}
      >
        {rate}
      </Text>
      <Text
        style={{
          fontFamily: "TajawalBold",
          color: textColor,
          fontSize: 24,
        }}
      >
        {grade}
      </Text>
    </View>
  );
};

export default CardRate;
