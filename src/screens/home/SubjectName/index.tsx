import { View, Image, StyleSheet, ImageBackground } from "react-native";
import { useLayoutEffect } from "react";
import { HomeStackParamList } from "@Types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { screenHeight, screenWidth } from "@Utils/Helper";
import BannerAdmob from "@Components/BannerAdmob";

type Props = StackScreenProps<HomeStackParamList, "SubjectName">;

const SubjectNameScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "الأسماء الشائعة للمواد",
    });
  }, []);
  return (
    <ImageBackground
      source={require("@Assets/images/PlanBackground.webp")}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
      resizeMode="cover"
    >
      <BannerAdmob position="top" />
      <BannerAdmob position="center" />
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
      >
        <Image
          source={require("@Assets/images/subjects-name/1.webp")}
          resizeMode="contain"
          style={{
            width: screenWidth,
            height: screenHeight * 0.4,
          }}
        />
        <Image
          source={require("@Assets/images/subjects-name/2.webp")}
          resizeMode="contain"
          style={{
            width: screenWidth,
            height: screenHeight * 0.4,
          }}
        />
      </ReactNativeZoomableView>
      <BannerAdmob position="bottom" />
    </ImageBackground>
  );
};

export default SubjectNameScreen;