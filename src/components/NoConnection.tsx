import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useColorScheme } from "@Src/store/themeContext";

import Colors from "@GlobalStyle/Colors";
import { Feather } from "@expo/vector-icons";

const NoConnection = ({ refetch }: { refetch?: () => void }) => {
  const { theme } = useColorScheme();
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>
        لا يوجد اتصال بالانترنت
      </Text>
      <TouchableOpacity
        onPress={refetch}
        style={[
          styles.button,
          {
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
          },
        ]}
      >
        <Feather name="refresh-cw" size={moderateScale(20)} color={textColor} />
      </TouchableOpacity>
    </View>
  );
};

export default NoConnection;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Bukra",
    fontSize: moderateScale(20),
  },
  button: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(10),
  },
});
