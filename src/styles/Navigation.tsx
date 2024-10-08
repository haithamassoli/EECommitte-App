import Colors from "./Colors";

export const LightNavigationColors = {
  colors: {
    background: Colors.lightBackground,
    border: Colors.lightBackground,
    card: Colors.lightBackground,
    notification: "rgb(255, 69, 58)",
    primary: Colors.primary400,
    text: Colors.lightText,
  },
  dark: false,
};

export const DarkNavigationColors = {
  colors: {
    background: Colors.darkBackground,
    border: "rgb(39, 39, 41)",
    card: "rgb(18, 18, 18)",
    notification: "rgb(255, 69, 58)",
    primary: Colors.primary400,
    text: Colors.darkText,
  },
  dark: true,
};
