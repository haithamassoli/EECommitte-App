import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";

type Props = {
  handlePress: (num: number) => void;
  results: any;
};

const SearchResults = ({ results, handlePress }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <>
      {results.length > 0 ? (
        results.map((result: any, index: number) => (
          <View key={index}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderColor: theme === "light" ? "#fff" : "#000",
                },
              ]}
              onPress={() => handlePress(result.id)}
            >
              <Text style={[styles.text, { color: textColor }]}>
                {result.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(16),
              fontFamily: "TajawalBold",
              textAlign: "center",
              color: textColor,
            }}
          >
            لا يوجد نتائج
          </Text>
        </View>
      )}
    </>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  button: {
    justifyContent: "flex-end",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
  },
  text: {
    fontSize: moderateScale(15),
    fontFamily: "TajawalMedium",
    textAlign: "left",
  },
});
