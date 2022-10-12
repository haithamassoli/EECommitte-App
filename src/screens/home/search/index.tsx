import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  LayoutAnimation,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import SubjectsData from "@Src/data/Subjects";
import Colors from "@GlobalStyle/Colors";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import {
  deleteStorage,
  getDataFromStorage,
  screenHeight,
  storeDataToStorage,
} from "@Utils/Helper";
import { HomeStackParamList } from "@Types/navigation";
import { ThemeContext } from "@Src/store/themeContext";
import SearchResults from "@Components/ui/SearchInput/SearchResults";
import { StackScreenProps } from "@react-navigation/stack";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import BannerAdmob from "@Components/BannerAdmob";
import DoctorsData from "@Src/data/Doctors";

const options = {
  keys: ["name", "name2"],
};

type Props = StackScreenProps<HomeStackParamList, "Search">;

const SearchScreen = ({ navigation, route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [historyResults, setHistoryResults] = useState([] as any[]);
  const { theme, toggleTheme } = useContext(ThemeContext);
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
          onPress={backAction}
        >
          <Feather
            name="arrow-right"
            size={24}
            color={textColor}
            style={{ paddingHorizontal: 10 }}
          />
          <Feather name="search" size={24} color={textColor} />
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
            {theme === "light" ? (
              <TouchableOpacity onPress={() => toggleTheme()}>
                <Feather
                  name="moon"
                  size={moderateScale(24)}
                  color={textColor}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => toggleTheme()}>
                <Feather
                  name="sun"
                  size={moderateScale(24)}
                  color={textColor}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      },
    });
  }, [theme, route]);

  const backAction = () => {
    if (
      route.params?.backTo === "Info" ||
      route.params?.backTo === "SupportUs"
    ) {
      navigation.reset({
        index: 0,
        routes: [
          {
            // @ts-ignore
            name: "InfoNavigation",
            params: { screen: route.params?.backTo },
          },
        ],
      });
    } else if (route.params?.backTo === "Plan") {
      navigation.getParent()?.navigate("SubjectsNavigation", {
        screen: "Plan",
      });
    } else if (
      route.params?.backTo === "Subject" &&
      // @ts-ignore
      route.params?.from
    ) {
      navigation.reset({
        index: 0,
        routes: [
          {
            // @ts-ignore
            name: "SubjectsNavigation",
            params: {
              screen: "Subject",
              params: {
                // @ts-ignore
                subjectId: route.params?.subjectId,
                from: route.params?.from,
              },
            },
          },
        ],
      });
    } else if (
      route.params?.backTo === "Subject" &&
      // @ts-ignore
      !route.params?.from
    ) {
      navigation.reset({
        index: 0,
        routes: [
          {
            // @ts-ignore
            name: "SubjectsNavigation",
            params: {
              screen: "Subject",
              params: {
                // @ts-ignore
                subjectId: route.params?.subjectId,
              },
            },
          },
        ],
      });
    } else if (route.params?.backTo === "SubjectFullPost") {
      navigation.reset({
        index: 0,
        routes: [
          {
            // @ts-ignore
            name: "SubjectsNavigation",
            params: {
              screen: "SubjectFullPost",
              params: {
                // @ts-ignore
                post: route.params?.post,
                // @ts-ignore
                postTitle: route.params?.postTitle,
                // @ts-ignore
                from: "Search",
              },
            },
          },
        ],
      });
    } else {
      navigation.goBack();
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getHistory = async () => {
      const historySearchResults = await getDataFromStorage("searchHistory");
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

  const handlePress = async (id: number) => {
    const prevData = await getDataFromStorage("searchHistory");
    const SubjectsResult = SubjectsData.find((subject) => subject.id === id);
    const DoctorsResult = DoctorsData.find((doctor: any) => doctor.id === id);
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHistoryResults(newData);
  };

  const deleteAll = async () => {
    deleteStorage("searchHistory");
    setHistoryResults([]);
  };

  const handlePressHistory = (id: number) => {
    const SubjectsResult = SubjectsData.find((subject) => subject.id === id);
    const DoctorsResult = DoctorsData.find((doctor: any) => doctor.id === id);
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
    <ScrollView
      keyboardShouldPersistTaps="handled"
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <BannerAdmob position="top" />
      <BannerAdmob position="center" />
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInput
            placeholder="ابحث عن ما يهمك: مواد، مدرسين، سنوات..."
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setResults={setResults}
            options={options}
            // @ts-ignore
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
                      {item.name2}
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
      <BannerAdmob position="bottom" />
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
