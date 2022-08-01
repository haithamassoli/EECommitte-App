import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "@Utils/Helper";
import Colors  from "@GlobalStyle/Colors";
const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.lightBackground
  },
  darkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.darkBackground
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.4,
  },
});

export default styles;
