import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import MAPPING from "./Mapping";
import { memo, useLayoutEffect, useContext, useMemo } from "react";
import {
  Image,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { verticalScale } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import HeaderRight from "../HeaderRight";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const { width, height } = useWindowDimensions();
  const { theme } = useContext(ThemeContext);
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
  const mapping = useMemo(
    () =>
      MAPPING.map((item) => {
        return {
          ...item,
          x1:
            width > height
              ? ((height * 0.994) / 100) * item.x1
              : (width / 100) * item.x1,
          y1:
            width > height
              ? ((height * 1.074) / 100) * item.y1
              : ((width * 1.074) / 100) * item.y1,
        };
      }),
    [width, height]
  );

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
          initialZoom={width > height ? 0.7 : 1}
          bindToBorders={true}
          visualTouchFeedbackEnabled={false}
        >
          <ImageMapper
            imgSource={require("@Assets/images/plan.webp")}
            imgWidth={width > height ? height : width}
            imgHeight={width > height ? height * 1.089 : width * 1.089}
            imgMap={mapping}
            containerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            onPress={(item: MapperItem) => {
              handleSelectArea(item.id);
            }}
          />
        </ReactNativeZoomableView>
        {height > 650 && width < height && (
          <Image
            source={require("@Assets/images/planLowerbar.webp")}
            resizeMode="contain"
            style={{
              width: width,
              height: height <= 1200 ? height * 0.08 : height * 0.12,
              bottom: width <= 500 ? verticalScale(32) : 12,
            }}
          />
        )}
      </ImageBackground>
    </>
  );
};

export default memo(PlanScreen);
