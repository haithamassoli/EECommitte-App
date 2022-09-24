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
              screenWidth <= 500 ? screenWidth * 1.2 : screenWidth * 1.1
            }
            imgMap={MAPPING}
            containerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={(item: MapperItem) => {
              handleSelectArea(item.id);
            }}
          />
          <Image
            source={require("@Assets/images/planLowerbar.webp")}
            resizeMode="contain"
            style={{
              width: screenWidth,
              height:
                screenHeight <= 1200 ? screenWidth * 0.18 : screenWidth * 0.1,
              bottom: screenWidth <= 500 ? verticalScale(32) : 12,
            }}
          />
        </ReactNativeZoomableView>
      </ImageBackground>
    </>
  );
};

export default memo(PlanScreen);
