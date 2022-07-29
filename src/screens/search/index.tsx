import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Fuse from "fuse.js";
import { Feather } from "@expo/vector-icons";
import subjects from "../../data/Subjects.json";
import { Colors } from "../../styles/Colors";
import SearchInput from "../../components/ui/SearchInput";
import { useEffect, useState } from "react";
import {
  deleteStorage,
  getDataFromStorage,
  storeDataToStorage,
} from "../../utils/Helper";

const { height } = Dimensions.get("window");

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["name", "name2"],
};

const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [historyResults, setHistoryResults] = useState([]);

  useEffect(() => {
    async function getHistory() {
      const historySearchResults = await getDataFromStorage("searchHistory");
      if (Array.isArray(historySearchResults)) {
        historySearchResults.map((ids) => {
          const result = subjects.find((subject) => subject.id === ids);
          // @ts-ignore
          setHistoryResults((prev) => [...prev, result]);
        });
      }
    }
    getHistory();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(subjects, options);
    const searchResults = fuse.search(searchInput);
    // @ts-ignore
    setResults(searchResults.slice(0, 5));
  }, [searchInput]);

  const handlePress = async (id: string) => {
    const prevData = await getDataFromStorage("searchHistory");
    if (Array.isArray(prevData) && !prevData.includes(id)) {
      if (prevData.length >= 5) {
        prevData.pop();
      }
      await storeDataToStorage("searchHistory", [id, ...prevData]);
      // @ts-ignore
      setHistoryResults((prev) => [
        // @ts-ignore
        subjects.find((subject) => subject.id === id),
        ...prev.slice(0, 4),
      ]);
    } else if (!prevData) {
      await storeDataToStorage("searchHistory", [id]);
      // @ts-ignore
      setHistoryResults([subjects.find((subject) => subject.id === id)]);
    }
    // navigation.navigate("Subject");
  };

  const handleDelete = async (id: string) => {
    const prevData = await getDataFromStorage("searchHistory");
    const newData = historyResults.filter((item: any) => item.id !== id);
    await storeDataToStorage(
      "searchHistory",
      prevData.filter((item: any) => item !== id)
    );
    setHistoryResults(newData);
  };

  const deleteAll = async () => {
    deleteStorage("searchHistory");
    setHistoryResults([]);
  };

  return (
    <ScrollView style={styles.container}>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>البحث السابق</Text>
          <Text
            onPress={deleteAll}
            style={{ fontSize: 16, fontWeight: "bold", color: Colors.primary }}
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
                <Text style={{ fontSize: 16, marginLeft: 5 }}>
                  {/* @ts-ignore */}
                  {item.name2}
                </Text>
              </View>
              <Feather
                // @ts-ignore
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
            }}
          >
            لا يوجد بحث سابق
          </Text>
        )}

        <View style={{ marginTop: 15 }}>
          {results.length > 0 ? (
            results.map((item: any, index: number) => (
              <View key={index}>
                <TouchableOpacity
                  style={{ flexDirection: "row-reverse" }}
                  onPress={() => handlePress(item.item.id)}
                >
                  {item.item.name2
                    .split("")
                    .map((letter: string, index: number) => {
                      if (
                        searchInput.toLowerCase().includes(letter.toLowerCase())
                      ) {
                        return (
                          <Text
                            key={index}
                            style={{ fontSize: 16, fontWeight: "bold" }}
                          >
                            {letter}
                          </Text>
                        );
                      } else {
                        return (
                          <Text key={index} style={{ fontSize: 16 }}>
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
              }}
            >
              لا توجد بيانات
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  header: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: height / 8,
  },
});
