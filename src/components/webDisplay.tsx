import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { rtlWebview, screenWidth } from "@Utils/Helper";
import { memo, useContext } from "react";
import { Falsy, RecursiveArray, View, ViewStyle } from "react-native";
import RenderHTML from "react-native-render-html";

type NonRegisteredStylesProp<T> = T | Falsy | RecursiveArray<T | Falsy>;
type StylesDictionary = {
  [tag: string]: NonRegisteredStylesProp<any>;
};
export const WebDisplay = memo(function WebDisplay({ html }: { html: string }) {
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
  const tagsStyles: StylesDictionary = {
    p: {
      fontSize: 18,
      lineHeight: 24,
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontStyle: "normal",
      color: textColor,
    },
    a: {
      color: theme === "light" ? Colors.primary700 : Colors.primary400,
    },
    img: {
      display: "none",
    },
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 12, paddingVertical: 4 }}>
      <RenderHTML
        contentWidth={screenWidth}
        source={{
          html: rtlWebview(html),
        }}
        tagsStyles={tagsStyles}
      />
    </View>
  );
});
