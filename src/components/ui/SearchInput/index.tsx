import {
  View,
  TextInput,
  Animated,
  ViewStyle,
  StyleProp,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles";
import { Subject } from "@Types/index";
import Fuse from "fuse.js";
import Subjects from "@Src/data/Subjects";
import { useNavigation } from "@react-navigation/native";
import { getDataFromStorage, storeDataToStorage } from "@Utils/Helper";

const options = {
  keys: ["name", "name2"],
};

interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
  searchBarFocused: boolean;
  setSearchBarFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchInput = ({
  searchInput,
  setSearchInput,
  style,
  searchBarFocused,
  setSearchBarFocused,
}: SearchInputProps) => {
  const [results, setResults] = useState<Subject[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const textColor =
    theme === "light" ? Colors.darkTextColor : Colors.lightTextColor;

  const searchAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fuse = new Fuse(Subjects, options);
    const searchResults = fuse.search(searchInput);
    const newArr = searchResults.slice(0, 5).map((result) => {
      return result.item;
    });
    setResults(newArr.slice(0, 5));
  }, [searchInput]);

  const handleFocus = () => {
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setSearchBarFocused(true);
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
          setSearchBarFocused(false);
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
          {results.length > 0 ? (
            results.map((result: Subject, index: number) => (
              <View key={index}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row-reverse",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderColor: Colors.gray,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                  onPress={() => handlePress(result.id)}
                >
                  {result.name2
                    .split("")
                    .map((letter: string, index: number) => {
                      if (
                        searchInput.toLowerCase().includes(letter.toLowerCase())
                      ) {
                        return (
                          <Text
                            key={index}
                            style={{
                              fontSize: 16,
                              fontFamily: "TajawalMedium",
                              color: textColor,
                            }}
                          >
                            {letter}
                          </Text>
                        );
                      } else {
                        return (
                          <Text
                            key={index}
                            style={{
                              fontSize: 16,
                              color: textColor,
                              fontFamily: "TajawalMedium",
                            }}
                          >
                            {letter}
                          </Text>
                        );
                      }
                    })}
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text
              style={{
                fontFamily: "TajawalMedium",
                textAlign: "center",
                alignSelf: "center",
                top: 50,
                fontSize: 16,
                color: textColor,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              لا يوجد نتائج
            </Text>
          )}
        </View>
      )}
    </Animated.View>
  );
};

export default SearchInput;

{
  /* {searchInput.length > 0 ? (
            <Text
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontFamily: "TajawalMedium",
                borderColor: Colors.gray,
                borderWidth: 1,
                borderRadius: 10,
                fontSize: 16,
                color: textColor,
              }}
              onPress={() => console.log("pressed")}
            >
              جديد لجنتكم
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "TajawalMedium",
                textAlign: "center",
                alignSelf: "center",
                top: 50,
                fontSize: 16,
                color: textColor,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              لا يوجد نتائج
            </Text>
          )} */
}
