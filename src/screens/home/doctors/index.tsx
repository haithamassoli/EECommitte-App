import { Text, View, ActivityIndicator, Image } from "react-native";
import DoctorsData from "@Src/data/Doctors";
import { Doctor } from "@Types/index";
import SearchInput from "@Components/ui/SearchInput";
import { memo, useContext, useLayoutEffect, useState } from "react";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import DoctorCard from "@Components/DoctorCard";
import { FlashList } from "@shopify/flash-list";
import { Feather } from "@expo/vector-icons";
import CustomHeader from "@Components/ui/CustomHeader";

type Props = StackScreenProps<HomeStackParamList, "Doctors">;

const options = {
  keys: ["name", "name2"],
};

const DoctorsScreen = ({ navigation, route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Doctor[] | []>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/doctors.png")
      : require("@Assets/images/icons/dark-icons/doctors.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "الكادر التدريسي",
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

  useLayoutEffect(() => {
    setLoading(true);
    const doctor = DoctorsData.find(
      (doctor) => doctor.id === route.params.doctorId
    );
    if (doctor) {
      setSearchInput(doctor.name2);
      setResults([doctor]);
    }
    setLoading(false);
  }, [route.params.doctorId]);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={Colors.primary400}
      />
    );
  }
  return (
    <>
      {loading}
      <View style={{ marginHorizontal: 12, flex: 1 }}>
        <SearchInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setResults={setResults}
          options={options}
          list={DoctorsData}
          style={{ marginTop: 12 }}
        />
        {results.length > 0 && searchInput.length > 0 ? (
          <FlashList
            keyboardShouldPersistTaps="always"
            data={results}
            estimatedItemSize={100}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DoctorCard
                email={item.email}
                image={item.image}
                name={item.name}
                office={item.office}
                phone={item.phone}
                website={item.website}
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
            data={DoctorsData}
            keyboardShouldPersistTaps="always"
            estimatedItemSize={100}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DoctorCard
                email={item.email}
                image={item.image}
                name={item.name}
                office={item.office}
                phone={item.phone}
                website={item.website}
              />
            )}
          />
        )}
      </View>
    </>
  );
};

export default memo(DoctorsScreen);
