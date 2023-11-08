import { View, TouchableOpacity } from "react-native";
import { memo } from "react";
import { horizontalScale, moderateScale } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { ColorSchemeButton } from "@Components/ColorSchemeButton";

type Props = {
  onPress: () => void;
};

const HeaderRight = ({ onPress }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingRight: horizontalScale(16),
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Feather
          name="search"
          size={moderateScale(24)}
          color={textColor}
          style={{ paddingHorizontal: horizontalScale(12) }}
        />
      </TouchableOpacity>
      <ColorSchemeButton />
    </View>
  );
};

export default memo(HeaderRight);
