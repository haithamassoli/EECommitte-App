import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { Feather } from "@expo/vector-icons";

const NoConnection = ({ refetch }: any) => {
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
      <TouchableOpacity
        onPress={refetch}
        style={{
          backgroundColor:
            theme === "light"
              ? Colors.lightBackgroundSec
              : Colors.darkBackgroundSec,
          paddingHorizontal: horizontalScale(20),
          paddingVertical: verticalScale(12),
          borderRadius: moderateScale(10),
          marginTop: verticalScale(10),
        }}
      >
        <Feather name="refresh-cw" size={moderateScale(20)} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

export default NoConnection;
