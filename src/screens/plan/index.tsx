import { View, ScrollView } from "react-native";
import ImageMapper from "../../components/imageMapper";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { screenWidth } from "../../utils/Helper";

import styles from "./styles";
import MAPPING from "./Mapping";
import { MapperItem } from "../../types";



const PlanScreen = ({ navigation }: any) => {
  const handleSelectArea = (areaId: number) => {
    navigation.navigate("subject", { areaId });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
        >
          <ImageMapper
            // @ts-ignore
            imgSource={require("../../../assets/images/plan.jpg")}
            imgWidth={screenWidth}
            imgHeight={screenWidth * 1.074}
            imgMap={MAPPING}
            multiselect
            containerStyle={{ top: 0 }}
            onPress={(item: MapperItem) => {
              handleSelectArea(item.id);
            }}
          />
        </ReactNativeZoomableView>
      </View>
    </ScrollView>
  );
};

export default PlanScreen;
