import { Text, ScrollView, View, ActivityIndicator } from "react-native";
import DoctorsData from "@Src/data/Doctors";
import { Doctor } from "@Types/index";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useLayoutEffect, useState } from "react";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import DoctorCard from "@Components/DoctorCard";

type Props = StackScreenProps<HomeStackParamList, "Doctors">;

const options = {
  keys: ["name", "name2"],
};

const DoctorsScreen = ({ route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Doctor[] | []>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

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
          <ScrollView keyboardShouldPersistTaps="always">
            {results.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                email={doctor.email}
                image={doctor.image}
                name={doctor.name}
                office={doctor.office}
                phone={doctor.phone}
                website={doctor.website}
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
            {DoctorsData.map((doctor: Doctor) => (
              <DoctorCard
                key={doctor.id}
                email={doctor.email}
                image={doctor.image}
                name={doctor.name}
                office={doctor.office}
                phone={doctor.phone}
                website={doctor.website}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default DoctorsScreen;
