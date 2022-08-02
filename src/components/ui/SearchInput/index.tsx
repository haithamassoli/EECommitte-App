import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import styles from "./styles";

interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ searchInput, setSearchInput }: SearchInputProps) => {
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
  return (
    <View style={styles.searchContainer}>
      {searchInput.length > 0 ? (
        <Feather
          name="x"
          size={24}
          color={textColor}
          style={styles.searchIcon}
          onPress={() => setSearchInput("")}
        />
      ) : (
        <Feather
          name="search"
          size={24}
          color={textColor}
          style={styles.searchIcon}
        />
      )}
      <TextInput
        value={searchInput}
        onChangeText={(searchString) => setSearchInput(searchString)}
        placeholder="ابحث..."
        placeholderTextColor={"#fff"}
        style={[
          styles.searchInput,
          {
            color: textColor,
          },
        ]}
      />
    </View>
  );
};

export default SearchInput;
