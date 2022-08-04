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
      <TextInput
        value={searchInput}
        onChangeText={(searchString) => setSearchInput(searchString)}
        placeholder="ابحث عن ما يهمك: مواد، مدرسين، سنوات..."
        placeholderTextColor={Colors.gray}
        selectionColor={Colors.primary700}
        style={[
          styles.searchInput,
          {
            color: theme === "light" ? Colors.gray : Colors.primary400,
          },
        ]}
      />
      {searchInput.length > 0 ? (
        <Feather
          name="x"
          size={24}
          color={theme === "light" ? Colors.gray : Colors.primary400}
          style={styles.searchIcon}
          onPress={() => setSearchInput("")}
        />
      ) : (
        <Feather
          name="search"
          size={24}
          color={theme === "light" ? Colors.gray : Colors.primary400}
          style={styles.searchIcon}
        />
      )}
    </View>
  );
};

export default SearchInput;
