import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../../utils/Helper";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.4,
  },
});

export default styles;
