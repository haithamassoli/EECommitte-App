import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import { screenHeight, screenWidth } from "@Utils/Helper";
import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import MAPPING from "./Mapping";
import { memo, useLayoutEffect, useContext } from "react";
import { Image, StyleSheet, ImageBackground, View } from "react-native";
import { verticalScale } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import HeaderRight from "../HeaderRight";
import BannerAdmob from "@Components/BannerAdmob";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderRight
            onPress={() => {
              navigation.getParent()?.navigate("HomeNavigation", {
                screen: "Search",
                params: {
                  backTo: "Plan",
                },
              });
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
        <BannerAdmob position="top" />
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
              screenWidth < 500 && screenHeight > 650
                ? screenHeight * 0.54
                : screenWidth < 500 && screenHeight! > 650
                ? screenWidth * 0.6
                : screenHeight * 0.7
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
        <BannerAdmob position="bottom" />
      </ImageBackground>
    </>
  );
};

export default memo(PlanScreen);
