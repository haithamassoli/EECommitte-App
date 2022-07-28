import { useState } from "react";
import { View, ScrollView } from "react-native";
import ImageMapper from "../../components/imageMapper";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { screenWidth } from "../../utils/Helper";

import styles from "./styles";

const MAPPING = [
  {
    id: "1",
    shape: "circle",
    x1: (screenWidth / 100) * 17,
    y1: (screenWidth * 1.074 / 100 ) * 63,
    width: 50,
    height: 50,
    radius: 25,
    fill: "black",
    prefill: "black",
  },
  {
    id: "2",
    shape: "circle",
    x1: (screenWidth / 100) * 68,
    y1: (screenWidth * 1.074 / 100 ) * 27,
    width: 50,
    height: 50,
    radius: 25,
    fill: "red",
    prefill: "red",
  },
  {
    id: "3",
    shape: "circle",
    x1: 100,
    y1: 100,
    width: 50,
    height: 50,
    radius: 25,
    prefill: "red",
    fill: "red",
  },
  {
    id: "4",
    shape: "circle",
    x1: 90,
    y1: 30,
    width: 50,
    height: 50,
    radius: 25,
    prefill: "red",
    fill: "red",
  },
];

const PlanScreen = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<null | string>(null);

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
              setSelectedAreaId(item.id);
            }}
          />
        </ReactNativeZoomableView>
      </View>
    </ScrollView>
  );
};

export default PlanScreen;
