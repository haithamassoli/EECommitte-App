import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";

import Colors from "@GlobalStyle/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { Image } from "expo-image";

type Props = {
  onPress: () => void;
  iconColor: ImageSourcePropType;
};

const CustomHeader = ({ onPress, iconColor }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Feather
        name="arrow-right"
        style={styles.icon}
        size={moderateScale(24)}
        color={textColor}
      />
      <Image
        transition={400}
        contentFit="contain"
        source={iconColor}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default CustomHeader;
const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  icon: { marginLeft: horizontalScale(12) },
  image: {
    width: horizontalScale(40),
    height: verticalScale(40),
    marginTop: verticalScale(4),
  },
});
