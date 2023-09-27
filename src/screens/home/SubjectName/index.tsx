import { StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import { HomeStackParamList } from "@Types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { blurhash, screenHeight, screenWidth } from "@Utils/Helper";
import { Image, ImageBackground } from "expo-image";

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
      placeholder={blurhash}
      transition={400}
      placeholderContentFit="cover"
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
      contentFit="cover"
    >
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
      >
        <Image
          source={require("@Assets/images/subjects-name/1.webp")}
          transition={400}
          contentFit="contain"
          style={{
            width: screenWidth,
            height: screenHeight * 0.4,
          }}
        />
        <Image
          source={require("@Assets/images/subjects-name/2.webp")}
          transition={400}
          contentFit="contain"
          style={{
            width: screenWidth,
            height: screenHeight * 0.4,
          }}
        />
      </ReactNativeZoomableView>
    </ImageBackground>
  );
};

export default SubjectNameScreen;
