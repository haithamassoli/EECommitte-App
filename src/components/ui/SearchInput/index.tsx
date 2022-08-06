import {
  View,
  TextInput,
  Animated,
  ViewStyle,
  StyleProp,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useRef } from "react";
import styles from "./styles";
import { Subject } from "@Types/index";
import { useNavigation } from "@react-navigation/native";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";
import SearchResults from "./SearchResults";

type Focused = Props & {
  searchBarFocused: boolean;
  setSearchBarFocused: React.Dispatch<React.SetStateAction<boolean>>;
  results: Subject[];
};
type NotFocused = Props & {
  searchBarFocused?: never;
  setSearchBarFocused?: never;
  results?: never;
};

type Props = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
};

const SearchInput = ({
  searchInput,
  setSearchInput,
  style,
  searchBarFocused,
  setSearchBarFocused,
  results,
}: Focused | NotFocused) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const textColor =
    theme === "light" ? Colors.darkTextColor : Colors.lightTextColor;

  const searchAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    if (setSearchBarFocused) setSearchBarFocused(true);
  };

  const handlePress = async (id: number) => {
    const prevData = await getDataFromStorage("searchHistory");
    if (Array.isArray(prevData) && !prevData.includes(id)) {
      if (prevData.length >= 5) {
        prevData.pop();
      }
      await storeDataToStorage("searchHistory", [id, ...prevData]);
    } else if (!prevData) {
      await storeDataToStorage("searchHistory", [id]);
    }
    Keyboard.dismiss();
    setSearchInput("");
    // @ts-ignore
    navigation.navigate("SubjectsNavigation", {
      screen: "Subject",
      params: { areaId: id },
    });
  };

  return (
    <Animated.View
      style={[
        styles.searchContainer,
        style,
        {
          position: "relative",
          zIndex: 12,
          transform: [
            {
              translateY: searchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              }),
            },
          ],
        },
      ]}
    >
      <TextInput
        onFocus={handleFocus}
        onBlur={() => {
          Animated.timing(searchAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
          if (setSearchBarFocused) setSearchBarFocused(false);
        }}
        value={searchInput}
        onChangeText={(searchString) => setSearchInput(searchString)}
        placeholder="ابحث عن ما يهمك: مواد، مدرسين، سنوات..."
        placeholderTextColor={Colors.gray}
        selectionColor={Colors.primary700}
        style={[
          styles.searchInput,
          {
            color: theme === "light" ? Colors.gray : Colors.primary400,
            zIndex: 15,
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
          color={theme === "light" ? Colors.primary700 : Colors.primary400}
          style={styles.searchIcon}
        />
      )}
      {searchBarFocused && (
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            position: "absolute",
            top: 25,
            left: 0,
            right: 0,
            width: "100%",
            height: 203,
            zIndex: 10,
            backgroundColor:
              theme === "light" ? Colors.dark : Colors.lightBackground,
            paddingTop: 25,
            borderRadius: 10,
          }}
        >
          <SearchResults
            results={results}
            handlePress={handlePress}
            searchInput={searchInput}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default SearchInput;
