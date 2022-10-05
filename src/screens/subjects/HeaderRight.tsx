import { View, TouchableOpacity } from "react-native";
import { useContext, memo } from "react";
import { horizontalScale, moderateScale } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";

type Props = {
  onPress: () => void;
};

const HeaderRight = ({ onPress }: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingEnd: horizontalScale(10),
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Feather
          name="search"
          size={moderateScale(24)}
          color={textColor}
          style={{ paddingStart: horizontalScale(10) }}
        />
      </TouchableOpacity>
      {theme === "light" ? (
        <TouchableOpacity onPress={() => toggleTheme()}>
          <Feather name="moon" size={moderateScale(24)} color={textColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => toggleTheme()}>
          <Feather name="sun" size={moderateScale(24)} color={textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(HeaderRight);
