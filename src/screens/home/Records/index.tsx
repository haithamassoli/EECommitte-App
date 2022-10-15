import NoConnection from "@Components/NoConnection";
import RecordCard from "@Components/RecordCard";
import SearchInput from "@Components/ui/SearchInput";
import Colors from "@GlobalStyle/Colors";
import { FlashList } from "@shopify/flash-list";
import { fetchRecords, fetchSearchRecords } from "@Src/api/fetchRecords";
import { ThemeContext } from "@Src/store/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext, useState } from "react";
import { View, Text, ActivityIndicator, RefreshControl } from "react-native";

const options = {
  keys: ["subject", "searchName", "doctor"],
};

const RecordsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [refetchCounter, setRefetchCounter] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const { data, isLoading, refetch, isFetching }: any =
    fetchRecords(refetchCounter);
  const { data: searchRecord, isLoading: isLoadingSearchRecord }: any =
    fetchSearchRecords();
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const handleRefetch = async () => {
    await refetch();
  };
  if (isLoading || isLoadingSearchRecord) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={theme === "light" ? Colors.primary700 : Colors.primary400}
      />
    );
  }
  if (Array.isArray(data) && data.length === 0) {
    return <NoConnection refetch={handleRefetch} />;
  }
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
        list={searchRecord}
        style={{ marginVertical: verticalScale(8) }}
      />
      {results.length > 0 && searchInput.length > 0 ? (
        <FlashList
          data={results}
          estimatedItemSize={25}
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
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                if (refetchCounter === 0) {
                  setRefetchCounter(1);
                }
              }}
              colors={
                theme === "light" ? [Colors.primary700] : [Colors.primary400]
              }
              progressBackgroundColor={
                theme === "light"
                  ? Colors.lightBackgroundSec
                  : Colors.darkBackgroundSec
              }
              tintColor={
                theme === "light" ? Colors.primary700 : Colors.primary400
              }
            />
          }
          renderItem={({ item }: any) => {
            if (typeof item === "string") {
              return (
                <Text
                  style={{
                    fontSize: moderateScale(18),
                    color: textColor,
                    fontFamily: "Bukra",
                    marginTop: verticalScale(20),
                    textAlign: "left",
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
          estimatedItemSize={25}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="always"
        />
      )}
    </View>
  );
};

export default RecordsScreen;
