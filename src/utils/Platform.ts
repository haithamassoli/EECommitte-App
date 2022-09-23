import { screenHeight, screenWidth } from "./Helper";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) =>
  (screenWidth / guidelineBaseWidth) * size;
const verticalScale = (size: number) =>
  (screenHeight / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

// import { Platform, TextStyle } from "react-native";
// import {
//   widthPercentageToDP,
//   heightPercentageToDP,
// } from "react-native-responsive-screen";

// export const IS_IOS = Platform.OS === "ios";

// export const IS_ANDROID = Platform.OS === "android";

// export const IS_DEV_ENV = __DEV__ === true;

// export const DEVICE_VERSION = Platform.Version;

// const X_HEIGHT = 812;
// const XS_MAX_HEIGHT = 896;
// The dimensions of the provided designs screen
// const DESIGN_SCREEN_WIDTH = 375;
// const DESIGN_SCREEN_HEIGHT = X_HEIGHT;
// const DESIGN_SCREEN_HEIGHT = 869

// Calculate the adaptive width given the design screen width dimension.
// To be used for style props like: width, marginHorizontal, fontSize, ...
// export const wp = (designWidth: number) => {
//   return widthPercentageToDP((designWidth * 100) / DESIGN_SCREEN_WIDTH);
// };

// Calculate the adaptive height given the design screen height dimension.
// To be used for style props like: height, marginVertical, ...
// export const hp = (designHeight: number) => {
//   return heightPercentageToDP((designHeight * 100) / DESIGN_SCREEN_HEIGHT);
// };

// export function fontSizing(size: number): TextStyle {
//   return {
//     fontSize: Platform.OS === "ios" ? wp(size) : wp(size) - 1,
//   };
// }

// export const isIPhoneX =
//   Platform.OS === "ios" && !Platform.isPad && !Platform.isTVOS
//     ? screenWidth >= X_HEIGHT ||
//       screenHeight >= X_HEIGHT ||
//       screenWidth >= XS_MAX_HEIGHT ||
//       screenHeight >= XS_MAX_HEIGHT
//     : false;

// export enum spacing {
//   xs = 4,
//   s = 8,
//   m = 16,
//   l = 24,
//   xl = 32,
//   "2xl" = 40,
//   "3xl" = 48,
//   "4xl" = 56,
// }
