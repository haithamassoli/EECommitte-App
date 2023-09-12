import { StyleSheet } from "react-native";
import { screenWidth } from "@Utils/Helper";
import Colors from "@GlobalStyle/Colors";
import {
  horizontalScale,
  moderateScale,
  ms,
  verticalScale,
} from "@Utils/Platform";
const styles = StyleSheet.create({
  logosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(12),
  },
  logoAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lagnaLogo: {
    width: horizontalScale(50),
    height: verticalScale(50),
    resizeMode: "contain",
  },
  logoTextContainter: {
    marginStart: horizontalScale(8),
  },
  logoTitleAr: {
    fontSize: moderateScale(16),
    fontFamily: "Bukra",
  },
  logoTitleEn: {
    fontSize: moderateScale(10),
    fontFamily: "Bukra",
    textAlign: "left",
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
    marginVertical: verticalScale(12),
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
    bottom: verticalScale(-25),
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
  buttonsContainer: {
    flex: 1,
    marginTop: verticalScale(8),
    marginHorizontal: horizontalScale(28),
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: ms(55),
    height: ms(55),
  },
  iconBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
  },
  iconText: {
    fontSize: moderateScale(14),
    textAlign: "center",
    fontFamily: "TajawalMedium",
  },
});

export default styles;
