import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { rtlWebview, screenWidth } from "@Utils/Helper";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext } from "react";
import { Falsy, RecursiveArray, View } from "react-native";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
const systemFonts = [...defaultSystemFonts, "Dubai"];

type NonRegisteredStylesProp<T> = T | Falsy | RecursiveArray<T | Falsy>;
type StylesDictionary = {
  [tag: string]: NonRegisteredStylesProp<any>;
};
export const WebDisplay = function WebDisplay({ html }: { html: string }) {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const tagsStyles: StylesDictionary = {
    body: {
      color: textColor,
      textAlign: "left",
      paddingHorizontal: horizontalScale(10),
      lineHeight: verticalScale(36),
      fontSize: moderateScale(18),
      fontFamily: "Dubai",
    },
    a: {
      color: theme === "light" ? Colors.primary700 : Colors.primary400,
    },
    img: {
      display: "none",
    },
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: horizontalScale(12),
        paddingVertical: verticalScale(4),
      }}
    >
      <RenderHTML
        defaultTextProps={{
          selectable: true,
          selectionColor:
            theme === "light" ? Colors.primary400 : Colors.primary700,
        }}
        contentWidth={screenWidth}
        source={{
          html: rtlWebview(html),
        }}
        tagsStyles={tagsStyles}
        systemFonts={systemFonts}
      />
    </View>
  );
};
