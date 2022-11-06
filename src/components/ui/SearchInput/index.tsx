import {
  View,
  TextInput,
  Animated,
  Keyboard,
  LayoutAnimation,
} from "react-native";
import Fuse from "fuse.js";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useEffect, useRef } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {
  getDataFromStorage,
  screenHeight,
  storeDataToStorage,
} from "@Utils/Helper";
import SearchResults from "./SearchResults";
import { SearchInputProps } from "@Types/Search";
import { HomeNavigationProp } from "@Screens/home";
import { moderateScale, verticalScale } from "@Utils/Platform";
import DoctorsData from "@Src/data/Doctors";

let delayTimer: any;

const SearchInput = ({
  searchInput,
  setSearchInput,
  style,
  searchBarFocused,
  setSearchBarFocused,
  results,
  options,
  list,
  setResults,
  placeholder,
}: SearchInputProps) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<HomeNavigationProp>();
  const searchAnim = useRef(new Animated.Value(0)).current;
  const iconColor = theme === "light" ? Colors.primary700 : Colors.primary400;

  useEffect(() => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      const fuse = new Fuse<any>(list, options);
      const searchResults = fuse.search(searchInput);
      const newArr = searchResults.slice(0, 5).map((result) => {
        return result.item;
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setResults(newArr.slice(0, 5));
    }, 400);
    return () => {
      clearTimeout(delayTimer);
    };
  }, [searchInput]);

  const handleFocus = () => {
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    if (setSearchBarFocused) setSearchBarFocused(true);
  };

  const handlePress = async (id: number) => {
    const doctor = DoctorsData.find((doctor: any) => doctor.id == id);
    const prevData = await getDataFromStorage("searchHistory");
    if (Array.isArray(prevData) && !prevData.includes(id)) {
      if (prevData.length >= 10) {
        prevData.pop();
      }
      await storeDataToStorage("searchHistory", [id, ...prevData]);
    } else if (!prevData) {
      await storeDataToStorage("searchHistory", [id]);
    }
    Keyboard.dismiss();
    setSearchInput("");
    if (doctor) {
      navigation.navigate("Doctors", {
        doctorId: id,
      });
    } else {
      navigation.navigate("Subject", { subjectId: id });
    }
  };

  return (
    <Animated.View
      style={[
        styles.searchContainer,
        style,
        {
          zIndex: 1500,
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
        onSubmitEditing={() => {
          if (Array.isArray(results) && results.length > 0) {
            handlePress(results[0].id);
          }
        }}
        onChangeText={(searchString) => setSearchInput(searchString)}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        selectionColor={Colors.primary700}
        allowFontScaling={false}
        textAlign="right"
        style={[
          styles.searchInput,
          {
            fontSize: moderateScale(14),
            color: theme === "light" ? Colors.lightText : Colors.darkText,
            zIndex: 1400,
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
          },
        ]}
      />
      {searchInput.length > 0 ? (
        <Feather
          name="x"
          size={moderateScale(24)}
          color={iconColor}
          style={styles.searchIcon}
          onPress={() => setSearchInput("")}
        />
      ) : (
        <Feather
          name="search"
          size={moderateScale(24)}
          color={iconColor}
          style={styles.searchIcon}
        />
      )}
      {searchBarFocused && (
        <View
          style={{
            position: "absolute",
            top: verticalScale(22),
            overflow: "hidden",
            left: 0,
            right: 0,
            height:
              screenHeight < 650 ? verticalScale(250) : verticalScale(210),
            zIndex: 10,
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
            paddingTop: verticalScale(25),
            borderBottomLeftRadius: moderateScale(14),
            borderBottomRightRadius: moderateScale(14),
          }}
        >
          <SearchResults results={results} handlePress={handlePress} />
        </View>
      )}
    </Animated.View>
  );
};

export default SearchInput;
