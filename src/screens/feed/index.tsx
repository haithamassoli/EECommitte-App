import { View, Text, Image, ScrollView } from "react-native";
import styles from "./styles";
const FeedScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} resizeMode="contain" source={require("../../../assets/images/uni.jpg")} />
      </View>
    </ScrollView>
  );
};

export default FeedScreen;
