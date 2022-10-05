import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";

type Props = {
  onPress: () => void;
  iconColor: ImageSourcePropType;
};

const CustomHeader = ({ onPress, iconColor }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center" }}
      onPress={onPress}
    >
      <Feather
        name="arrow-right"
        style={{ marginLeft: horizontalScale(12) }}
        size={moderateScale(24)}
        color={textColor}
      />
      <Image
        source={iconColor}
        style={{
          width: horizontalScale(40),
          height: verticalScale(40),
          marginTop: verticalScale(4),
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomHeader;
