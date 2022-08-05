import {
  View,
  TextInput,
  Animated,
  ViewStyle,
  StyleProp,
  Text,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext, useRef, useState } from "react";
import styles from "./styles";

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
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.darkTextColor : Colors.lightTextColor;

  const searchAnim = useRef(new Animated.Value(0)).current;
  // const [searchBarFocused, setSearchBarFocused] = useState(false);

  const handleFocus = () => {
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setSearchBarFocused(true);
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
          <View>
            {[1, 1, 1, 1, 1].map((item, index) => (
              <Text
                key={index}
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
            ))}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

export default SearchInput;
// import { Platform, Animated, StyleSheet } from "react-native";
// import { SearchBar as ElementsSearchBar } from "react-native-elements";
// import { Navigation } from "react-native-navigation";

//     this.state = {
//       searchBarTopPadding: new Animated.Value(0),
//       searchBarFocused: false
//     };

//     /** Component Bindings */
//     this.searchBarFocused = this.searchBarFocused.bind(this);
//     this.searchBarBlurred = this.searchBarBlurred.bind(this);
//
//   render() {
//     /** Styles */
//     const { searchContainerStyle } = styles;
//     /** Props */
//     const { search, placeholder, onSearchButtonPress, onCancel, onClear, onChangeText } = this.props;
//     /** State */
//     const { searchBarTopPadding } = this.state;

//     return (
//       <Animated.View
//         style={[searchContainerStyle, { paddingTop: searchBarTopPadding }]}
//       >
//         <ElementsSearchBar
//           value={search}
//           platform={Platform.OS}
//           placeholder={placeholder}
//           cancelIcon={{ type: "font-awesome", name: "chevron-left" }}
//           inputContainerStyle={
//             Platform.OS === "ios" ? { backgroundColor: "#efefef" } : null
//           }
//           containerStyle={
//             Platform.OS === "ios" ? { backgroundColor: "#FFFFFF" } : null
//           }
//           lightTheme={true}
//           autoCapitalize="none"
//           autoCorrect={false}
//           spellCheck={false}
//           returnKeyType="search"
//           onChangeText={value => onChangeText(value)}
//           onBlur={this.searchBarBlurred}
//           onFocus={this.searchBarFocused}
//           onSubmitEditing={() => {
//             if (onSearchButtonPress) onSearchButtonPress(search);
//           }}
//           onCancel={onCancel}
//           onClear={onClear}
//         />
//       </Animated.View>
//     );
//   }

//   /**
//    * Sets the search as focused and evokes any side effects
//    */
//   searchBarFocused() {
//     this.setState({ searchBarFocused: true });

//     if (Platform.OS === "ios") {
//       const { statusBarHeight } = this.props;

//       Animated.timing(this.state.searchBarTopPadding, {
//         toValue: statusBarHeight,
//         duration: 200
//       }).start();

//       Navigation.mergeOptions(this.props.componentId, {
//         topBar: {
//           visible: false,
//           animate: true
//         }
//       });

//       Navigation.mergeOptions(this.props.componentId, {
//         statusBar: { style: "dark" }
//       });
//     }

//     if (this.props.onFocus) this.props.onFocus();
//   }

//   /**
//    * Sets the search as blurred and evokes any side effects
//    */
//   searchBarBlurred() {
//     this.setState({ searchBarFocused: false });

//     if (Platform.OS === "ios") {
//       Animated.timing(this.state.searchBarTopPadding, {
//         toValue: 0,
//         duration: 200
//       }).start();

//       Navigation.mergeOptions(this.props.componentId, {
//         topBar: {
//           visible: true,
//           animate: true
//         }
//       });

//       Navigation.mergeOptions(this.props.componentId, {
//         statusBar: { style: "light" }
//       });
//     }

//     if (this.props.onBlur) this.props.onBlur();
//   }
// }

// RNNSearchBar.defaultProps = {
//   placeholder: "search"
// };

// RNNSearchBar.propTypes = {
//   search: PropTypes.string,
//   componentId: PropTypes.string.isRequired,
//   statusBarHeight: PropTypes.number.isRequired,
//   placeholder: PropTypes.string,
//   onChangeText: PropTypes.func,
//   onSearchButtonPress: PropTypes.func,
//   onFocus: PropTypes.func,
//   onBlur: PropTypes.func,
//   onClear: PropTypes.func,
//   onCancel: PropTypes.func
// };

// /** -------------------------------------------- */
// /**             Component Styling                */
// /** -------------------------------------------- */
// const styles = StyleSheet.create({
//   searchContainerStyle: {
//     flex: 1,
//     paddingLeft: 4,
//     paddingRight: 4,
//     backgroundColor: "#FFFFFF",
//     zIndex: 999
//   }
// });
