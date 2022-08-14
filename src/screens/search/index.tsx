import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import SubjectsData from "@Src/data/Subjects";
import Colors from "@GlobalStyle/Colors";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useEffect, useState } from "react";
import {
  deleteStorage,
  getDataFromStorage,
  storeDataToStorage,
} from "@Utils/Helper";
import { HomeStackParamList } from "@Types/navigation";
import styles from "./styles";
import { ThemeContext } from "@Src/store/themeContext";
import SearchResults from "@Components/ui/SearchInput/SearchResults";
import DoctorsData from "@Src/data/Doctors";
import { StackScreenProps } from "@react-navigation/stack";

const options = {
  keys: ["name", "name2"],
};

type Props = StackScreenProps<HomeStackParamList, "Search">;

const SearchScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [historyResults, setHistoryResults] = useState([] as any[]);

  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const iconColor = theme === "light" ? Colors.primary700 : Colors.primary400;

  useEffect(() => {
    const getHistory = async () => {
      const historySearchResults = await getDataFromStorage("searchHistory");
      if (Array.isArray(historySearchResults)) {
        historySearchResults.map((ids: number) => {
          const subjectsResult = SubjectsData.find(
            (subject) => subject.id === ids
          );
          const DoctorsResult = DoctorsData.find((doctor) => doctor.id === ids);
          if (subjectsResult && DoctorsResult) {
            setHistoryResults((prev) => [
              ...prev,
              subjectsResult,
              DoctorsResult,
            ]);
          } else if (subjectsResult) {
            setHistoryResults((prev) => [...prev, subjectsResult]);
          } else if (DoctorsResult) {
            setHistoryResults((prev) => [...prev, DoctorsResult]);
          }
        });
      }
    };
    getHistory();
  }, []);

  const handlePress = async (id: number) => {
    const prevData = await getDataFromStorage("searchHistory");
    const SubjectsResult = SubjectsData.find((subject) => subject.id === id);
    const DoctorsResult = DoctorsData.find((doctor) => doctor.id === id);
    if (Array.isArray(prevData) && !prevData.includes(id)) {
      if (prevData.length >= 10) {
        prevData.pop();
      }
      await storeDataToStorage("searchHistory", [id, ...prevData]);
      if (SubjectsResult && DoctorsResult) {
        setHistoryResults((prev) => [
          SubjectsResult,
          DoctorsResult,
          ...prev.slice(0, 9),
        ]);
      } else if (SubjectsResult) {
        setHistoryResults((prev) => [SubjectsResult, ...prev.slice(0, 9)]);
      } else if (DoctorsResult) {
        setHistoryResults((prev) => [DoctorsResult, ...prev.slice(0, 9)]);
      }
    } else if (!prevData) {
      await storeDataToStorage("searchHistory", [id]);
      if (SubjectsResult) {
        setHistoryResults([SubjectsResult]);
      }
      if (DoctorsResult) {
        setHistoryResults([DoctorsResult]);
      }
    }
    Keyboard.dismiss();
    setSearchInput("");
    if (SubjectsResult) {
      navigation.getParent()?.navigate("SubjectsNavigation", {
        screen: "Subject",
        params: { subjectId: id },
      });
    } else if (DoctorsResult) {
      navigation.navigate("Doctors", {
        doctorId: id,
      });
    }
  };

  const handleDelete = async (id: number) => {
    const prevData = await getDataFromStorage("searchHistory");
    const newData = historyResults.filter((item) => item.id !== id);
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
    const SubjectsResult = SubjectsData.find((subject) => subject.id === id);
    const DoctorsResult = DoctorsData.find((doctor) => doctor.id === id);
    if (SubjectsResult) {
      navigation.getParent()?.navigate("SubjectsNavigation", {
        screen: "Subject",
        params: { subjectId: id },
      });
    } else if (DoctorsResult) {
      navigation.navigate("Doctors", {
        doctorId: id,
      });
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInput
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setResults={setResults}
            options={options}
            list={[...SubjectsData, ...DoctorsData]}
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
              zIndex: 1000,
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
