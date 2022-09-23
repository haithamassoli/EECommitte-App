import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "@Utils/Helper";
import Colors from "@GlobalStyle/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
const styles = StyleSheet.create({
  logosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(12),
  },
  lagnaLogo: {
    width: horizontalScale(230),
    height: verticalScale(80),
    resizeMode: "contain",
  },
  tasharckLogo: {
    width: horizontalScale(50),
    height: verticalScale(70),
    resizeMode: "contain",
  },
  headerText: {
    fontSize: moderateScale(30),
    fontWeight: "normal",
    fontFamily: "TajawalMedium",
    marginTop: verticalScale(16),
    marginHorizontal: horizontalScale(12),
  },
  sliderContainer: {
    flex: 1,
    marginTop: verticalScale(8),
    overflow: "hidden",
  },
  sliderImage: {
    width: screenWidth,
    height: "100%",
    resizeMode: "cover",
    marginHorizontal: horizontalScale(8),
    borderRadius: moderateScale(30),
  },
  sliderDotsContainer: {
    position: "absolute",
    bottom: -25,
    transform: [{ translateX: -screenWidth / 2 + 40 }],
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: horizontalScale(12),
  },
  sliderDot: {
    width: horizontalScale(10),
    height: verticalScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.gray,
    marginHorizontal: horizontalScale(4),
  },
  activeDot: {
    backgroundColor: Colors.primary700,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(8),
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
  },
  icon: {
    width: horizontalScale(55),
    height: verticalScale(55),
    resizeMode: "contain",
  },
  iconText: {
    fontSize: moderateScale(14),
    textAlign: "center",
    fontFamily: "TajawalMedium",
    color: Colors.gray,
  },
});

export default styles;
