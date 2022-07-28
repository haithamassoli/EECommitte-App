import { useState } from "react";
import { View, ScrollView } from "react-native";
import ImageMapper from "../../components/imageMapper";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { screenWidth } from "../../utils/Helper";

import styles from "./styles";
import MAPPING from "./Mapping";

const PlanScreen = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string[]>([]);

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
            selectedAreaId={selectedAreaId}
            multiselect
            containerStyle={{ top: 0 }}
            onPress={(item: any) => {
              setSelectedAreaId([item.id]);
            }}
          />
        </ReactNativeZoomableView>
      </View>
    </ScrollView>
  );
};

export default PlanScreen;
