import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import SubjectsData from "@Src/data/Subjects";
import Colors from "@GlobalStyle/Colors";
import SearchInput from "@Components/ui/SearchInput";
import { useEffect, useState, useLayoutEffect } from "react";
import {
  deleteDataMMKV,
  getDataMMKV,
  screenHeight,
  storeDataMMKV,
} from "@Utils/Helper";
import { HomeStackParamList } from "@Types/navigation";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import SearchResults from "@Components/ui/SearchInput/SearchResults";
import { StackScreenProps } from "@react-navigation/stack";
import {
  horizontalScale,
  moderateScale,
  ms,
  verticalScale,
} from "@Utils/Platform";
import DoctorsData from "@Src/data/Doctors";
import { ColorSchemeButton } from "@Components/ColorSchemeButton";

const options = {
  keys: ["name", "name2"],
};

type Props = StackScreenProps<HomeStackParamList, "Search">;

const SearchScreen = ({ navigation, route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [historyResults, setHistoryResults] = useState([] as any[]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const iconColor = theme === "light" ? Colors.primary700 : Colors.primary400;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "البحث",
      headerLeft: () => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="arrow-right"
            size={ms(24)}
            color={textColor}
            style={{ paddingHorizontal: 10 }}
          />
          <Feather name="search" size={ms(24)} color={textColor} />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: horizontalScale(16),
            }}
          >
            <ColorSchemeButton />
          </View>
        );
      },
    });
  }, [theme, route]);

  useEffect(() => {
    const getHistory = () => {
      const historySearchResults = getDataMMKV("searchHistory");
      if (Array.isArray(historySearchResults)) {
        historySearchResults.map((ids: number) => {
          const subjectsResult = SubjectsData.find(
            (subject) => subject.id === ids
          );
          const DoctorsResult = DoctorsData.find(
            (doctor: any) => doctor.id === ids
          );
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

  const handlePress = (id: number) => {
    const prevData = getDataMMKV("searchHistory");
    const SubjectsResult = SubjectsData.find((subject) => subject.id === id);
    const DoctorsResult = DoctorsData.find((doctor: any) => doctor.id === id);
    if (Array.isArray(prevData) && !prevData.includes(id)) {
      if (prevData.length >= 10) {
        prevData.pop();
      }
      storeDataMMKV("searchHistory", [id, ...prevData]);
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
      storeDataMMKV("searchHistory", [id]);
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
      navigation.navigate("Subject", { subjectId: id });
    } else if (DoctorsResult) {
      navigation.navigate("Doctors", {
        doctorId: id,
      });
    }
  };

  const handleDelete = (id: number) => {
    const prevData = getDataMMKV("searchHistory");
    const newData = historyResults.filter((item) => item.id !== id);
    storeDataMMKV(
      "searchHistory",
      prevData.filter((item: number) => item !== id)
    );
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHistoryResults(newData);
  };

  const deleteAll = () => {
    deleteDataMMKV("searchHistory");
    setHistoryResults([]);
  };

  const handlePressHistory = (id: number) => {
    const SubjectsResult = SubjectsData.find((subject) => subject.id === id);
    const DoctorsResult = DoctorsData.find((doctor: any) => doctor.id === id);
    if (SubjectsResult) {
      navigation.navigate("Subject", { subjectId: id });
    } else if (DoctorsResult) {
      navigation.navigate("Doctors", {
        doctorId: id,
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: verticalScale(12) }}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInput
            placeholder="ابحث عن ما يهمك: مواد، مدرسين، سنوات..."
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
                marginTop: verticalScale(15),
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(20),
                  fontWeight: "bold",
                  color: textColor,
                }}
              >
                البحث السابق
              </Text>
              <Text
                onPress={deleteAll}
                style={{
                  fontSize: moderateScale(16),
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
                <View key={index} style={styles.historyContainer}>
                  <View style={styles.historyItem}>
                    <Feather
                      name="clock"
                      size={moderateScale(20)}
                      color={iconColor}
                    />
                    <Text
                      onPress={() => handlePressHistory(item.id)}
                      style={[styles.historyText, { color: textColor }]}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Feather
                    onPress={() => handleDelete(item.id)}
                    name="x"
                    size={moderateScale(20)}
                    color={iconColor}
                  />
                </View>
              ))
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: moderateScale(24),
                  marginTop: verticalScale(40),
                  color: textColor,
                }}
              >
                لا يوجد بحث سابق
              </Text>
            )}
          </>
        ) : (
          <View
            style={[
              styles.resultsContainer,
              {
                backgroundColor:
                  theme === "light"
                    ? Colors.lightBackgroundSec
                    : Colors.darkBackgroundSec,
              },
            ]}
          >
            <SearchResults results={results} handlePress={handlePress} />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(12),
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: screenHeight / 8,
    width: "100%",
  },
  historyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(25),
    justifyContent: "space-between",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyText: {
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(5),
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
    minHeight: verticalScale(124),
    zIndex: 1000,
    borderRadius: moderateScale(10),
  },
});
