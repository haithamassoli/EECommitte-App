import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import { screenWidth } from "@Utils/Helper";
import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import MAPPING from "./Mapping";
import { memo } from "react";
import { Image, StyleSheet, ImageBackground } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const handleSelectArea = (subjectId: number) => {
    navigation.navigate("Subject", { subjectId });
  };
  return (
    <>
      <ImageBackground
        source={require("@Assets/images/PlanBackground.png")}
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
            imgSource={require("@Assets/images/plan.png")}
            imgWidth={screenWidth}
            imgHeight={screenWidth * 0.97}
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
            source={require("@Assets/images/planLowerbar.png")}
            resizeMode="contain"
            style={{
              width: screenWidth,
              height: screenWidth * 0.18,
              bottom: verticalScale(30),
            }}
          />
        </ReactNativeZoomableView>
      </ImageBackground>
    </>
  );
};

export default memo(PlanScreen);
