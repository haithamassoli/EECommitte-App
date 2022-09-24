import RecordCard from "@Components/RecordCard";
import CustomHeader from "@Components/ui/CustomHeader";
import SearchInput from "@Components/ui/SearchInput";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";
import RecordsData from "@Src/data/Records";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { HomeStackParamList } from "@Types/navigation";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { memo, useContext, useLayoutEffect, useState } from "react";
import { View, Text, SectionList } from "react-native";

type Props = StackScreenProps<HomeStackParamList, "Records">;

const options = {
  keys: ["subject", "searchName", "doctor"],
};

const RecordsScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Record[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/records.png")
      : require("@Assets/images/icons/dark-icons/records.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "تسجيلات اللجنة",
      headerTitleStyle: {
        fontFamily: "Bukra",
      },
      headerLeft: () => (
        <CustomHeader
          onPress={() => navigation.goBack()}
          iconColor={iconColor}
        />
      ),
    });
  }, []);

  return (
    <View
      style={{
        marginHorizontal: horizontalScale(12),
        flex: 1,
      }}
    >
      <SearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setResults={setResults}
        options={options}
        list={RecordsData[0].data}
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
        <SectionList
          sections={RecordsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecordCard
              link={item.link}
              image={item.image}
              subject={item.subject}
              doctor={item.doctor}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              style={{
                fontSize: moderateScale(18),
                color: textColor,
                fontFamily: "Bukra",
                marginTop: verticalScale(20),
              }}
            >
              {title}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default memo(RecordsScreen);
