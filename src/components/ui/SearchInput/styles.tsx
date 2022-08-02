import Colors from "@GlobalStyle/Colors";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
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
  searchInput: {
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.gray,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
  xIcon: {
    position: "absolute",
    left: 10,
    zIndex: 10,
  },
});

export default styles;
