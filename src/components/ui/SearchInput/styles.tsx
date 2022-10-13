import {
  horizontalScale,
  isIOS,
  moderateScale,
  verticalScale,
} from "@Utils/Platform";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    paddingHorizontal: horizontalScale(20),
    paddingStart: horizontalScale(40),
    paddingVertical: isIOS ? verticalScale(12) : verticalScale(8),
    borderRadius: moderateScale(30),
    fontFamily: "TajawalBold",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    transform: [{ rotate: "90deg" }],
    left: horizontalScale(10),
    zIndex: 2000,
  },
});

export default styles;
