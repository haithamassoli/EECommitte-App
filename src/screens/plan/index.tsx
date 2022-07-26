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
    x2: 30,
    y2: 30,
    width: 30,
    height: 30,
    fill: "#167",
    prefill: "#299",
  },
]

const PlanScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <ImageMapper
        // @ts-ignore
          imgSource={require("../../../assets/images/plan.jpg")}
          // imgWidth={screenWidth}
          // imgHeight={screenHeight}
          imgMap={MAPPING}
          // width={10}
          // height={10}
          onPress={(item: any, index: any) => {
            console.log(item, index);
          }}
        />
        {/* <Image style={styles.image} resizeMode="contain" source={require("../../../assets/images/uni.jpg")} /> */}
        <Text>PlanScreen</Text>
      </View>
    </ScrollView>
  );
};

export default PlanScreen;
