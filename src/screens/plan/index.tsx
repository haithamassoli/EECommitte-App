import { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import ImageMapper from "../../components/imageMapper";
import { screenHeight, screenWidth } from "../../utils/Helper";
import styles from "./styles";

const MAPPING = [
  {
    id: "1",
    shape: "rectangle",
    x1: 1904,
    y1: 2010,
    x2: 1906,
    y2: 2012,
    width: 15,
    height: 15,
    fill: "#657",
    prefill: "#928",
  },
  {
    id: "2",
    shape: "rectangle",
    x1: 0,
    y1: 0,
    x2: 100,
    y2: 100,
    width: 100,
    height: 100,
    fill: "#167",
    prefill: "#299",
  },
  {
    id: "0",
    name: "First Area Name",
    shape: "rectangle",
    width: 200,
    height: 200,
    x1: 0,
    y1: 0,
    prefill: "red",
    fill: "blue",
  },
  {
    id: "7",
    name: "Face",
    shape: "rectangle",
    x2: 145,
    y2: 70,
    x1: 90,
    y1: 30,
    prefill: "red",
    fill: "blue",
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
        <ImageMapper
          // @ts-ignore
          imgSource={require("../../../assets/images/plan.jpg")}
          imgWidth={screenWidth}
          imgHeight={screenHeight}
          imgMap={MAPPING}
          selectedAreaId={selectedAreaId}
          multiselect
          containerStyle={{ top: 0 }}
          onPress={(item: any, idx: any, event: any) => {
            console.log(item, idx, event);
            mapperAreaClickHandler(item, idx, event);
          }}
        />
        {/* <Image style={styles.image} resizeMode="contain" source={require("../../../assets/images/uni.jpg")} /> */}
        <Text>PlanScreen</Text>
      </View>
    </ScrollView>
  );
};

export default PlanScreen;
