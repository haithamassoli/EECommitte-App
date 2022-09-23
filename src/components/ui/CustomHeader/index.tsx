import { View, Image, ImageSourcePropType } from "react-native";
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
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Feather
        name="arrow-right"
        style={{ marginLeft: horizontalScale(12) }}
        size={moderateScale(24)}
        color={textColor}
        onPress={onPress}
      />
      <Image
        source={iconColor}
        style={{
          width: horizontalScale(50),
          height: verticalScale(50),
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default CustomHeader;
