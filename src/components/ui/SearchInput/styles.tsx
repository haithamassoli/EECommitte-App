import Colors from "@GlobalStyle/Colors";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    fontFamily: "TajawalMedium",
    fontSize: 14,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    transform: [{ rotate: "90deg" }],
    left: 10,
    zIndex: 10,
  },
});

export default styles;