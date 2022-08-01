import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";

const { height } = Dimensions.get("window");
interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ searchInput, setSearchInput }: SearchInputProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.searchContainer}>
      {searchInput.length > 0 ? (
        <Feather
          name="x"
          size={24}
          color={
            theme === "light" ? Colors.lightTextColor : Colors.darkTextColor
          }
          style={styles.searchIcon}
          onPress={() => setSearchInput("")}
        />
      ) : (
        <Feather
          name="search"
          size={24}
          color={
            theme === "light" ? Colors.lightTextColor : Colors.darkTextColor
          }
          style={styles.searchIcon}
        />
      )}
      <TextInput
        value={searchInput}
        onChangeText={(searchString) => setSearchInput(searchString)}
        placeholder="ابحث..."
        placeholderTextColor={
          theme === "light" ? Colors.lightTextColor : Colors.darkTextColor
        }
        style={[
          styles.searchInput,
          {
            color:
              theme === "light" ? Colors.lightTextColor : Colors.darkTextColor,
          },
        ]}
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
    opacity: 0.3,
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
