import RecordCard from "@Components/RecordCard";
import SearchInput from "@Components/ui/SearchInput";
import Colors from "@GlobalStyle/Colors";
import { FlashList } from "@shopify/flash-list";
import RecordsData, { RecordsDataSearch } from "@Src/data/Records";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { memo, useContext, useState } from "react";
import { View, Text } from "react-native";

const options = {
  keys: ["subject", "searchName", "doctor"],
};

const RecordsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Record[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <View
      style={{
        marginHorizontal: horizontalScale(12),
        flex: 1,
      }}
    >
      <SearchInput
        placeholder="ابحث عن تسجيل..."
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setResults={setResults}
        options={options}
        list={RecordsDataSearch}
        style={{ marginVertical: verticalScale(8) }}
      />
      {results.length > 0 && searchInput.length > 0 ? (
        <FlashList
          data={results}
          estimatedItemSize={20}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <RecordCard
              link={item.link}
              image={item.image}
              subject={item.subject}
              doctor={item.doctor}
            />
          )}
        />
      ) : searchInput.length > 0 ? (
        <>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: moderateScale(24),
              marginTop: verticalScale(40),
              color: textColor,
            }}
          >
            لا يوجد نتائج
          </Text>
        </>
      ) : (
        <FlashList
          data={RecordsData}
          renderItem={({ item }) => {
            if (typeof item === "string") {
              return (
                <Text
                  style={{
                    fontSize: moderateScale(18),
                    color: textColor,
                    fontFamily: "Bukra",
                    marginTop: verticalScale(20),
                  }}
                >
                  {item}
                </Text>
              );
            } else {
              return (
                <RecordCard
                  link={item.link}
                  image={item.image}
                  subject={item.subject}
                  doctor={item.doctor}
                />
              );
            }
          }}
          getItemType={(item) => {
            return typeof item === "string" ? "sectionHeader" : "row";
          }}
          estimatedItemSize={24}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="always"
        />
      )}
    </View>
  );
};

export default memo(RecordsScreen);
