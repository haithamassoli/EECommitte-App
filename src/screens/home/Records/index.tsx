import RecordCard from "@Components/RecordCard";
import SearchInput from "@Components/ui/SearchInput";
import Colors from "@GlobalStyle/Colors";
import RecordsData from "@Src/data/Records";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { screenWidth } from "@Utils/Helper";
import { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";

const options = {
  keys: ["searchName", "subject", "doctor"],
};

const RecordsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Record[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <View style={{ marginHorizontal: 12, flex: 1 }}>
      <SearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setResults={setResults}
        options={options}
        list={RecordsData}
        style={{ marginTop: 12 }}
      />
      {results.length > 0 && searchInput.length > 0 ? (
        <ScrollView keyboardShouldPersistTaps="always">
          {results.map((item, index) => (
            <RecordCard
              key={index}
              link={item.link}
              image={item.image}
              subject={item.subject}
              doctor={item.doctor}
            />
          ))}
        </ScrollView>
      ) : searchInput.length > 0 ? (
        <>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 24,
              marginTop: 40,
              color: textColor,
            }}
          >
            لا يوجد نتائج
          </Text>
        </>
      ) : (
        <ScrollView keyboardShouldPersistTaps="always">
          {RecordsData.map((item, index) => (
            <RecordCard
              key={index}
              link={item.link}
              image={item.image}
              subject={item.subject}
              doctor={item.doctor}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default RecordsScreen;
