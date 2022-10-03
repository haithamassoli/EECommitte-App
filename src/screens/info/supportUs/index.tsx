import { View, Text } from "react-native";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@Src/store/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";

const SupportUsScreen = () => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: "TajawalBold",
          fontSize: moderateScale(26),
          textAlign: "center",
          marginTop: verticalScale(20),
          color: textColor,
        }}
      >
        شكراً لوصولك هنا
      </Text>
      <Text
        style={{
          fontFamily: "Dubai",
          paddingHorizontal: horizontalScale(20),
          fontSize: moderateScale(20),
          textAlign: "center",
          marginTop: verticalScale(8),
          color: textColor,
        }}
      >
        أشكرك لمجرد وصولك إلى هنا لدعمنا نحتاج دعوتك الجميلة فقط :)
      </Text>
      <Ionicons
        name="heart"
        size={moderateScale(270)}
        color={Colors.secondYear}
        style={{ marginTop: verticalScale(20) }}
      />
    </View>
  );
};

export default SupportUsScreen;
