import { StackScreenProps } from "@react-navigation/stack";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import ImageMapper from "@Components/imageMapper";
import { screenWidth } from "@Utils/Helper";

import type { MapperItem } from "@Types/index";
import type { SubjectsStackParamList } from "@Types/navigation";
import styles from "./styles";
import MAPPING from "./Mapping";

type Props = StackScreenProps<SubjectsStackParamList, "Plan">;

const PlanScreen = ({ navigation }: Props) => {
  const handleSelectArea = (areaId: number) => {
    navigation.navigate("Subject", { areaId });
  };
  return (
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
      >
        <ImageMapper
          imgSource={require("@Assets/images/plan.jpg")}
          imgWidth={screenWidth}
          imgHeight={screenWidth * 1.074}
          imgMap={MAPPING}
          containerStyle={styles.container}
          onPress={(item: MapperItem) => {
            handleSelectArea(item.id);
          }}
        />
      </ReactNativeZoomableView>
  );
};

export default PlanScreen;
