import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../../utils/Helper";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.4,
  },
  input: {
    backgroundColor: "lightgrey",
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
});

export default styles;
