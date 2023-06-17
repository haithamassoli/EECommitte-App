import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import MAPPING from "./Mapping";
import { memo, useLayoutEffect, useContext } from "react";
import { Image, StyleSheet, ImageBackground } from "react-native";
import { verticalScale } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import HeaderRight from "../HeaderRight";
import { ScreenSizeContext } from "@Src/store/screenSizeContext";
type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { screenHeight, screenWidth } = useContext(ScreenSizeContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderRight
            onPress={() => {
              navigation.navigate("Search");
            }}
          />
        );
      },
    });
  }, [theme]);
  const handleSelectArea = (subjectId: number) => {
    navigation.navigate("Subject", { subjectId });
  };
  return (
    <>
      <ImageBackground
        source={require("@Assets/images/PlanBackground.webp")}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        resizeMode="cover"
      >
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={screenWidth > screenHeight ? 0.7 : 1}
          bindToBorders={true}
          visualTouchFeedbackEnabled={false}
        >
          <ImageMapper
            imgSource={require("@Assets/images/plan.webp")}
            imgWidth={screenWidth > screenHeight ? screenHeight : screenWidth}
            imgHeight={
              screenWidth > screenHeight
                ? screenHeight * 1.089
                : screenWidth * 1.089
            }
            imgMap={MAPPING}
            containerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            onPress={(item: MapperItem) => {
              handleSelectArea(item.id);
            }}
          />
        </ReactNativeZoomableView>
        {screenHeight > 650 && screenWidth < screenHeight && (
          <Image
            source={require("@Assets/images/planLowerbar.webp")}
            resizeMode="contain"
            style={{
              width: screenWidth,
              height:
                screenHeight <= 1200
                  ? screenHeight * 0.08
                  : screenHeight * 0.12,
              bottom: screenWidth <= 500 ? verticalScale(32) : 12,
            }}
          />
        )}
      </ImageBackground>
    </>
  );
};

export default memo(PlanScreen);
