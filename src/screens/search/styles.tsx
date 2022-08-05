import Colors from "@GlobalStyle/Colors";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  header: {
    fontSize: 20,
    color: Colors.primary400,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: height / 8,
  },
});

export default styles;
