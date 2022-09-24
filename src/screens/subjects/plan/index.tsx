import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import { screenWidth } from "@Utils/Helper";

import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import styles from "./styles";
import MAPPING from "./Mapping";
import { ThemeContext } from "@Src/store/themeContext";
import { memo, useContext } from "react";
import { Text, View } from "react-native";
import Colors from "@GlobalStyle/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const handleSelectArea = (subjectId: number) => {
    navigation.navigate("Subject", { subjectId });
  };
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Bukra",
          fontSize: moderateScale(24),
          color: theme === "light" ? Colors.gray : Colors.darkText,
          alignSelf: "flex-start",
          marginLeft: horizontalScale(20),
          marginTop: verticalScale(20),
        }}
      >
        اختر مادة:
      </Text>
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        style
      >
        <ImageMapper
          imgSource={require("@Assets/images/plan.webp")}
          imgWidth={screenWidth}
          imgHeight={screenWidth * 1.074}
          imgMap={MAPPING}
          containerStyle={styles.container}
          onPress={(item: MapperItem) => {
            handleSelectArea(item.id);
          }}
        />
      </ReactNativeZoomableView>
    </View>
  );
};

export default memo(PlanScreen);
