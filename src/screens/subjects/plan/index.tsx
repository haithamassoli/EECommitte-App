import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import { screenWidth } from "@Utils/Helper";

import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import styles from "./styles";
import MAPPING from "./Mapping";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { Text, View } from "react-native";
import Colors from "@GlobalStyle/Colors";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const handleSelectArea = (areaId: number) => {
    navigation.navigate("Subject", { areaId });
  };
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={theme === "light" ? styles.lightContainer : styles.darkContainer}
    >
      <Text
        style={{
          fontFamily: "Bukra",
          fontSize: 24,
          color: theme === "light" ? Colors.gray : Colors.darkTextColor,
          alignSelf: "flex-start",
          marginLeft: 20,
          marginTop: 20,
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
          imgSource={require("@Assets/images/plan.jpg")}
          imgWidth={screenWidth}
          imgHeight={screenWidth * 1.074}
          imgMap={MAPPING}
          containerStyle={
            theme === "light" ? styles.lightContainer : styles.darkContainer
          }
          onPress={(item: MapperItem) => {
            handleSelectArea(item.id);
          }}
        />
      </ReactNativeZoomableView>
    </View>
  );
};

export default PlanScreen;
