import { View, Text, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

interface InfoItemProps {
  icon: string;
  title: string;
  subTitle: string;
  onPress: () => void;
}

const InfoItem = ({ icon, title, subTitle, onPress }: InfoItemProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {/* @ts-ignore */}
        <Ionicons name={icon} color={Colors.gray} size={26} />
        <View style={{ marginStart: 12 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
      <Feather name="arrow-left" color={Colors.gray} size={20} />
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 14,
    color: Colors.gray,
  },
});