import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import { screenHeight, screenWidth } from "@Utils/Helper";
import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import MAPPING from "./Mapping";
import { memo } from "react";
import { Image, StyleSheet, ImageBackground } from "react-native";
import { verticalScale } from "@Utils/Platform";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
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
          initialZoom={1}
          bindToBorders={true}
        >
          <ImageMapper
            imgSource={require("@Assets/images/plan.webp")}
            imgWidth={screenWidth}
            imgHeight={
              screenWidth < 500
                ? screenHeight * 0.8
                : screenWidth < 700
                ? screenHeight * 0.7
                : screenHeight * 0.6
            }
            imgMap={MAPPING}
            containerStyle={{
              flexGrow: 1,
            }}
            onPress={(item: MapperItem) => {
              handleSelectArea(item.id);
            }}
          />
          {screenHeight > 650 && (
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
        </ReactNativeZoomableView>
      </ImageBackground>
    </>
  );
};

export default memo(PlanScreen);
