import Colors from "@GlobalStyle/Colors";
import { screenWidth } from "@Utils/Helper";
import { View, Text } from "react-native";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useState, useEffect } from "react";

type Props = {
  title: string;
  rate: number;
};

const CardRate = ({ title, rate }: Props) => {
  const [grade, setGrade] = useState("");
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  useEffect(() => {
    if (rate >= 4) {
      setGrade("متميز");
    } else if (rate >= 3.5) {
      setGrade("ممتاز");
    } else if (rate >= 3) {
      setGrade("جيد جدا");
    } else if (rate >= 2.5) {
      setGrade("جيد");
    } else if (rate >= 2) {
      setGrade("مقبول");
    } else if (rate >= 1.5) {
      setGrade("انذار");
    } else if (rate === 0) {
      setGrade("لا يوجد بيانات");
    } else {
      setGrade("F");
    }
  }, [rate]);

  return (
    <View
      style={{
        backgroundColor:
          theme === "light"
            ? Colors.lightBackgroundSec
            : Colors.darkBackgroundSec,
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
        {rate.toFixed(2)}
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
