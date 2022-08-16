import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Doctor, Subject } from "@Types/index";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

type Props = {
  searchInput: string;
  handlePress: (num: number) => void;
  results: Subject[] | Doctor[];
};

const SearchResults = ({ results, handlePress, searchInput }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.darkText : Colors.lightText;

  return (
    <>
      {results.length > 0 ? (
        results.map((result, index: number) => (
          <TouchableOpacity
            key={index}
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
                  <View key={index}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: textColor,
                        fontWeight: "bold",
                      }}
                    >
                      {letter}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View key={index}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: textColor,
                      }}
                    >
                      {letter}
                    </Text>
                  </View>
                );
              }
            })}
          </TouchableOpacity>
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
