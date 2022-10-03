import Colors from "@GlobalStyle/Colors";
import { screenHeight } from "@Utils/Helper";
import { horizontalScale, moderateScale } from "@Utils/Platform";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(12),
  },
  header: {
    fontSize: moderateScale(20),
    color: Colors.primary400,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight / 8,
  },
});

export default styles;
