import Colors from "@GlobalStyle/Colors";
import { StyleSheet } from "react-native";

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
    fontFamily: "TajawalBold",
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    transform: [{ rotate: "90deg" }],
    left: 10,
    zIndex: 100,
  },
});

export default styles;
