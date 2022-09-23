import Colors from "@GlobalStyle/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    paddingHorizontal: horizontalScale(40),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(30),
    fontFamily: "TajawalBold",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    transform: [{ rotate: "90deg" }],
    left: horizontalScale(10),
    zIndex: 100,
  },
});

export default styles;
