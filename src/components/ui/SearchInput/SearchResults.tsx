import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Subject } from "@Types/index";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

type Props = {
  searchInput: string;
  handlePress: (num: number) => void;
  results: Subject[];
};

const SearchResults = ({ results, handlePress, searchInput }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.darkTextColor : Colors.lightTextColor;

  return (
    <>
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
              {result.name2.split("").map((letter: string, index: number) => {
                if (searchInput.toLowerCase().includes(letter.toLowerCase())) {
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
    </>
  );
};

export default SearchResults;
