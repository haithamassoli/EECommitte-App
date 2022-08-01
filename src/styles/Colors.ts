import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";

const GlobalColors = () => {
  const { theme } = useContext(ThemeContext);
  return {
    textColor: theme === "light" ? "#121212" : "#eee",
    backgroundColor: theme === "light" ? "#eee" : "#121212",
    primary: "#FFEA61",
    primaryLight: "#FFF192",
    primaryLightest: "#FFFFB7",
    primaryDark: "#FFDD3C",
    primaryDarkest: "#FFD400",
    liteGreen: "rgb(117,204,49)",
    darkGreen: "rgb(58,149,60)",
    secondary: "rgb(15,23,43)",
    secondaryDark: "#ffa000",
    secondaryLight: "#ffc400",
    tertiary: "#ff5722",
    tertiaryDark: "#c62828",
    tertiaryLight: "#ffa000",
    gray: "#9e9e9e",
    grayDark: "#424242",
    grayLight: "#e0e0e0",
    grayLighter: "#f5f5f5",
    grayLightest: "#fafafa",
    grayDarker: "#757575",
  };
};

export default GlobalColors;
