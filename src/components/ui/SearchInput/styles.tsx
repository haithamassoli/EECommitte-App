import { screenHeight } from "@Utils/Helper";
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
    fontSize: moderateScale(14),
    zIndex: 1400,
    fontFamily: "TajawalBold",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    transform: [{ rotate: "90deg" }],
    left: horizontalScale(10),
    zIndex: 2000,
  },
  searchResults: {
    position: "absolute",
    top: verticalScale(22),
    overflow: "hidden",
    left: 0,
    right: 0,
    height: screenHeight < 650 ? verticalScale(250) : verticalScale(210),
    zIndex: 10,
    paddingTop: verticalScale(25),
    borderBottomLeftRadius: moderateScale(14),
    borderBottomRightRadius: moderateScale(14),
  },
});

export default styles;
