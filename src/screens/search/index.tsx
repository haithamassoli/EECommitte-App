import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Fuse from "fuse.js";
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

  useEffect(() => {
    const fuse = new Fuse(subjects, options);
    const searchResults = fuse.search(searchInput);
    const newArr = searchResults.slice(0, 5).map((result) => {
      return result.item;
    });
    setResults(newArr.slice(0, 5));
  }, [searchInput]);

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
    navigation.navigate("SubjectsNavigation", {
      screen: "Subject",
      params: { areaId: id },
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
      params: { areaId: id },
    });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.searchContainer}>
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
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
                  color: Colors.primary400,
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
                    <Feather name="clock" size={20} color="black" />
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
                    color="black"
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
          <View style={{ marginTop: 15 }}>
            {results.length > 0 ? (
              results.map((result: Subject, index: number) => (
                <View key={index}>
                  <TouchableOpacity
                    style={{ flexDirection: "row-reverse" }}
                    onPress={() => handlePress(result.id)}
                  >
                    {result.name2
                      .split("")
                      .map((letter: string, index: number) => {
                        if (
                          searchInput
                            .toLowerCase()
                            .includes(letter.toLowerCase())
                        ) {
                          return (
                            <Text
                              key={index}
                              style={{
                                fontSize: 16,
                                fontWeight: "bold",
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
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                  marginTop: 40,
                  color: textColor,
                }}
              >
                لا توجد بيانات
              </Text>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SearchScreen;
