import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import subjects from "@Src/data/Subjects";
import Colors from "@GlobalStyle/Colors";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useEffect, useState } from "react";
import {
  deleteStorage,
  getDataFromStorage,
  storeDataToStorage,
} from "@Utils/Helper";
import type { Subject } from "@Types/index";
import { BottomTabParamList } from "@Types/navigation";
import styles from "./styles";
import { ThemeContext } from "@Src/store/themeContext";
import SearchResults from "@Components/ui/SearchInput/SearchResults";

const options = {
  keys: ["name", "name2"],
};

type Props = BottomTabScreenProps<BottomTabParamList, "Search">;

const SearchScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Subject[] | []>([]);
  const [historyResults, setHistoryResults] = useState([] as Subject[]);
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;

  const iconColor = theme === "light" ? Colors.primary700 : Colors.primary400;

  useEffect(() => {
    async function getHistory() {
      const historySearchResults = await getDataFromStorage("searchHistory");
      if (Array.isArray(historySearchResults)) {
        historySearchResults.map((ids: number) => {
          const result = subjects.find((subject) => subject.id === ids);
          if (result) {
            setHistoryResults((prev) => [...prev, result]);
          }
        });
      }
    }
    getHistory();
  }, []);

  const handlePress = async (id: number) => {
    const prevData = await getDataFromStorage("searchHistory");
    if (Array.isArray(prevData) && !prevData.includes(id)) {
      if (prevData.length >= 5) {
        prevData.pop();
      }
      await storeDataToStorage("searchHistory", [id, ...prevData]);
      const result = subjects.find((subject) => subject.id === id);
      if (result) {
        setHistoryResults((prev) => [result, ...prev.slice(0, 4)]);
      }
    } else if (!prevData) {
      await storeDataToStorage("searchHistory", [id]);
      const result = subjects.find((subject) => subject.id === id);
      if (result) {
        setHistoryResults([result]);
      }
    }
    Keyboard.dismiss();
    setSearchInput("");
    navigation.navigate("SubjectsNavigation", {
      screen: "Subject",
      params: { subjectId: id },
    });
  };

  const handleDelete = async (id: number) => {
    const prevData = await getDataFromStorage("searchHistory");
    const newData = historyResults.filter((item: Subject) => item.id !== id);
    await storeDataToStorage(
      "searchHistory",
      prevData.filter((item: number) => item !== id)
    );
    setHistoryResults(newData);
  };

  const deleteAll = async () => {
    deleteStorage("searchHistory");
    setHistoryResults([]);
  };

  const handlePressHistory = (id: number) => {
    navigation.navigate("SubjectsNavigation", {
      screen: "Subject",
      params: { subjectId: id },
    });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.searchContainer}>
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setResults={setResults}
            options={options}
            list={subjects}
          />
        </View>
        {!searchInput ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: textColor,
                }}
              >
                البحث السابق
              </Text>
              <Text
                onPress={deleteAll}
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color:
                    theme === "light" ? Colors.primary700 : Colors.primary400,
                }}
              >
                حذف الكل
              </Text>
            </View>
            {historyResults.length > 0 ? (
              historyResults.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 25,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Feather name="clock" size={20} color={iconColor} />
                    <Text
                      onPress={() => handlePressHistory(item.id)}
                      style={{
                        fontSize: 16,
                        marginLeft: 5,
                        color: textColor,
                      }}
                    >
                      {item.name2}
                    </Text>
                  </View>
                  <Feather
                    onPress={() => handleDelete(item.id)}
                    name="x"
                    size={20}
                    color={iconColor}
                  />
                </View>
              ))
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  marginTop: 40,
                  color: textColor,
                }}
              >
                لا يوجد بحث سابق
              </Text>
            )}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              width: "100%",
              height: 203,
              zIndex: 10,
              backgroundColor:
                theme === "light" ? Colors.dark : Colors.lightBackground,
              borderRadius: 10,
            }}
          >
            <SearchResults
              results={results}
              handlePress={handlePress}
              searchInput={searchInput}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SearchScreen;
