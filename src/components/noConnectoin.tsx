import { View, Text } from "react-native";
import { useContext } from "react";
import { moderateScale } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

const NoConnectoin = () => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Bukra",
          fontSize: moderateScale(20),
          color: textColor,
        }}
      >
        لا يوجد اتصال بالانترنت
      </Text>
    </View>
  );
};

export default NoConnectoin;
