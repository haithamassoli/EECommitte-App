import RecordCard from "@Components/RecordCard";
import CustomHeader from "@Components/ui/CustomHeader";
import SearchInput from "@Components/ui/SearchInput";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";
import explanationsData from "@Src/data/OurExplanations";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { HomeStackParamList } from "@Types/navigation";
import { memo, useContext, useLayoutEffect, useState } from "react";
import { View, Text, Image } from "react-native";

type Props = StackScreenProps<HomeStackParamList, "OurExplanations">;

const options = {
  keys: ["searchName", "subject", "doctor"],
};

const OurExplanationsScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Record[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/best.png")
      : require("@Assets/images/icons/dark-icons/best.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "أبرز شروحاتنا",
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
        marginHorizontal: 12,
        flex: 1,
      }}
    >
      <SearchInput
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setResults={setResults}
        options={options}
        list={explanationsData}
        style={{ marginVertical: 8 }}
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
              fontSize: 24,
              marginTop: 40,
              color: textColor,
            }}
          >
            لا يوجد نتائج
          </Text>
        </>
      ) : (
        <FlashList
          data={explanationsData}
          keyboardShouldPersistTaps="always"
          estimatedItemSize={24}
          keyExtractor={(item) => item.id.toString()}
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

export default memo(OurExplanationsScreen);
