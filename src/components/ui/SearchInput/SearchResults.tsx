import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Doctor, Subject } from "@Types/index";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

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
              style={{
                flexDirection: "row-reverse",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderColor: theme === "light" ? "#fff" : "#000",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => handlePress(result.id)}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: textColor,
                  fontFamily: "TajawalMedium",
                }}
              >
                {result.name2}
              </Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: "TajawalBold",
            textAlign: "center",
            textAlignVertical: "center",
            color: textColor,
          }}
        >
          لا يوجد نتائج
        </Text>
      )}
    </>
  );
};

export default SearchResults;
