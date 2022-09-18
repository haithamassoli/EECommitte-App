import { View, Image, ImageSourcePropType } from "react-native";
import { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

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
        style={{ marginLeft: 12 }}
        size={24}
        color={textColor}
        onPress={onPress}
      />
      <Image
        source={iconColor}
        style={{
          width: 50,
          height: 50,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default CustomHeader;
