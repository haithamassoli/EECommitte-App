import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import MAPPING from "./Mapping";
import { useLayoutEffect, useContext, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ms, verticalScale } from "@Utils/Platform";
import { ThemeContext } from "@Src/store/themeContext";
import HeaderRight from "../HeaderRight";
import { Image, ImageBackground } from "expo-image";
import {
  blurhash,
  getDataFromStorage,
  screenHeight,
  screenWidth,
  storeDataToStorage,
} from "@Utils/Helper";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [mappingData, setMappingData] = useState<MapperItem[]>([]);
  const { theme } = useContext(ThemeContext);

  const onPressEdit = () => {
    setEditMode((prev) => !prev);
  };

  const onPressCheck = () => {
    setEditMode((prev) => !prev);
  };

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
  }, [theme, editMode]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={editMode ? onPressCheck : onPressEdit}>
          <Feather
            name={editMode ? "check" : "edit"}
            size={ms(24)}
            color={theme === "light" ? Colors.lightText : Colors.darkText}
            style={{ paddingHorizontal: ms(12) }}
          />
        </TouchableOpacity>
      ),
    });
  }, [theme, editMode]);

  const getMappingData = async () => {
    const data = await getDataFromStorage("mappingData");
    if (data) {
      setMappingData(data);
    } else {
      setMappingData(MAPPING);
    }
  };

  useEffect(() => {
    getMappingData();
  }, []);

  const handleSelectArea = async (subjectId: number) => {
    if (editMode) {
      // change subject prefill from mappingData state and save to storage again
      setMappingData((prev) => {
        const newData = prev.map((item) => {
          if (item?.id === subjectId) {
            return {
              ...item,
              prefill: item?.prefill === "#fff" ? "transparent" : "#fff",
              isFinished: item?.isFinished === true ? false : true,
            };
          }
          return item;
        });
        storeDataToStorage("mappingData", newData);
        return newData;
      });
    } else if (subjectId > 1000) {
      navigation.navigate("Subject", { subjectId });
    }
  };

  return (
    <>
      <ImageBackground
        source={require("@Assets/images/PlanBackground.webp")}
        transition={400}
        placeholderContentFit="cover"
        placeholder={blurhash}
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
          visualTouchFeedbackEnabled={false}
        >
          <ImageMapper
            imgSource={require("@Assets/images/plan.webp")}
            imgWidth={screenWidth}
            imgHeight={screenWidth * 1.089}
            imgMap={mappingData}
            containerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            onPress={(item: MapperItem) => {
              handleSelectArea(item.id);
            }}
          />
        </ReactNativeZoomableView>
        {screenHeight > 650 && (
          <Image
            source={require("@Assets/images/planLowerbar.webp")}
            contentFit="contain"
            transition={400}
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

export default PlanScreen;
