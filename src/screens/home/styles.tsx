import { StyleSheet } from "react-native";
import { screenWidth } from "@Utils/Helper";
import Colors from "@GlobalStyle/Colors";
const styles = StyleSheet.create({
  logosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 12,
  },
  logoAndTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  lagnaLogo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoTextContainter: {
    marginStart: 8,
  },
  logoTitleAr: {
    fontSize: 16,
    fontFamily: "Bukra",
  },
  logoTitleEn: {
    fontSize: 10,
    fontFamily: "Bukra",
    textAlign: "left",
  },
  tasharckLogo: {
    width: 50,
    height: 70,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "normal",
    fontFamily: "TajawalMedium",
    marginVertical: 12,
    marginHorizontal: 12,
  },
  sliderContainer: {
    flex: 1,
    marginTop: 8,
    overflow: "hidden",
  },
  sliderImage: {
    width: screenWidth,
    height: "100%",
    resizeMode: "cover",
    marginHorizontal: 8,
    borderRadius: 30,
  },
  sliderDotsContainer: {
    position: "absolute",
    bottom: -25,
    transform: [{ translateX: -screenWidth / 2 + 40 }],
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  sliderDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gray,
    marginHorizontal: 4,
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
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  iconBackground: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  iconText: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "TajawalMedium",
  },
});

export default styles;
