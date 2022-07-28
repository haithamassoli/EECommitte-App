import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../styles/Colors";

const { height } = Dimensions.get("window");

interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({searchInput, setSearchInput}: SearchInputProps) => {

  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="ios-search"
        size={24}
        color={Colors.secondary}
        style={styles.searchIcon}
      />
      <TextInput
        value={searchInput}
        onChangeText={(searchString) => setSearchInput(searchString)}
        placeholder="ابحث..."
        placeholderTextColor={Colors.secondary}
        style={styles.searchInput}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: height / 8,
  },
  searchInput: {
    paddingRight: 45,
    paddingLeft: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondaryLight,
    color: "#000",
    opacity: 0.3,
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
});