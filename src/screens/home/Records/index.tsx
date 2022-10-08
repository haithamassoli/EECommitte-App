import NoConnection from "@Components/NoConnection";
import RecordCard from "@Components/RecordCard";
import SearchInput from "@Components/ui/SearchInput";
import Colors from "@GlobalStyle/Colors";
import { FlashList } from "@shopify/flash-list";
import { fetchRecords, fetchSearchRecords } from "@Src/api/fetchRecords";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const options = {
  keys: ["subject", "searchName", "doctor"],
};

const RecordsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Record[] | []>([]);
  const { data, isLoading, refetch }: any = fetchRecords();
  const { data: searchRecord, isLoading: isLoadingSearchRecord }: any =
    fetchSearchRecords();
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={theme === "light" ? Colors.primary700 : Colors.primary400}
      />
    );
  }
  if (Array.isArray(data) && data.length === 0) {
    return <NoConnection refetch={refetch} />;
  }
  return (
    <View
      style={{
        marginHorizontal: horizontalScale(12),
        flex: 1,
      }}
    >
      {!isLoadingSearchRecord && Array.isArray(searchRecord) && (
        <SearchInput
          placeholder="ابحث عن تسجيل..."
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setResults={setResults}
          options={options}
          list={searchRecord}
          style={{ marginVertical: verticalScale(8) }}
        />
      )}
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
          data={data}
          renderItem={({ item }: any) => {
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

export default RecordsScreen;
