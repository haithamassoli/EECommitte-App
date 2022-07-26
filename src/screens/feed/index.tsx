import { View, Text, Image, ScrollView } from "react-native";
import styles from "./styles";
const FeedScreen = () => {
  return (
    // scroll view
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image style={{ width: 390, height: 300}} resizeMode="contain" source={require("../../../assets/images/uni.jpg")} />
        <Text>FeedScreen</Text>
      </View>
    </ScrollView>
  );
};

export default FeedScreen;
