import { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import ImageMapper from "../../components/imageMapper";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { screenWidth } from "../../utils/Helper";

import styles from "./styles";

const MAPPING = [
  {
    id: "1",
    shape: "circle",
    x1: 100,
    y1: 200,
    width: 50,
    height: 50,
    radius: 25,
    fill: "red",
    prefill: "red",
  },
  {
    id: "2",
    shape: "circle",
    x1: 0,
    y1: 0,
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
  const [selectedAreaId, setSelectedAreaId] = useState([]);

  console.log(selectedAreaId);
  const mapperAreaClickHandler = async (item: any, idx: any, event: any) => {
    const currentSelectedAreaId = selectedAreaId;
    if (Array.isArray(currentSelectedAreaId)) {
      // @ts-ignore
      const indexInState = currentSelectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log("Removing id", item.id);
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1),
        ]);
      } else {
        alert(`Clicked Item Id: ${item.id}`);
        console.log("Setting Id", item.id);
        // @ts-ignore
        setSelectedAreaId([...currentSelectedAreaId, item.id]);
      }
    } else {
      if (item.id === currentSelectedAreaId) {
        // @ts-ignore
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.id);
      }
    }
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
            selectedAreaId={selectedAreaId}
            multiselect
            containerStyle={{ top: 0 }}
            onPress={(item: any, idx: any, event: any) => {
              console.log(item, idx, event);
              mapperAreaClickHandler(item, idx, event);
            }}
          />
        </ReactNativeZoomableView>
      </View>
    </ScrollView>
  );
};

export default PlanScreen;
