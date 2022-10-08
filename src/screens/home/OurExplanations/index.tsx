import NoConnection from "@Components/NoConnection";
import RecordCard from "@Components/RecordCard";
import SearchInput from "@Components/ui/SearchInput";
import Colors from "@GlobalStyle/Colors";
import { FlashList } from "@shopify/flash-list";
import { fetchExplanations } from "@Src/api/fetchExplanations";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const options = {
  keys: ["searchName", "subject", "doctor"],
};

const OurExplanationsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Record[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading, refetch }: any = fetchExplanations();

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
      <SearchInput
        placeholder="ابحث عن شرح..."
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setResults={setResults}
        options={options}
        list={data}
        style={{ marginVertical: verticalScale(8) }}
      />
      {results.length > 0 && searchInput.length > 0 ? (
        <FlashList
          data={results}
          estimatedItemSize={24}
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
          keyboardShouldPersistTaps="always"
          estimatedItemSize={24}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <RecordCard
              link={item.link}
              image={item.image}
              subject={item.subject}
              doctor={item.doctor}
            />
          )}
        />
      )}
    </View>
  );
};

export default OurExplanationsScreen;
