import { Text, View, ActivityIndicator } from "react-native";
import { Doctor } from "@Types/index";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import DoctorCard from "@Components/DoctorCard";
import { FlashList } from "@shopify/flash-list";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { fetchDoctors } from "@Src/api/fetchDoctors";
import NoConnection from "@Components/NoConnection";

type Props = StackScreenProps<HomeStackParamList, "Doctors">;

const options = {
  keys: ["name", "name2"],
};

const DoctorsScreen = ({ route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Doctor[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading }: any = fetchDoctors();

  useLayoutEffect(() => {
    if (!isLoading && Array.isArray(data)) {
      const doctor = data.find(
        (doctor: any) => doctor.id === route.params.doctorId
      );
      if (doctor) {
        setSearchInput(doctor.name2);
        setResults([doctor]);
      }
    }
  }, [route.params.doctorId]);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color={theme === "light" ? Colors.primary700 : Colors.primary400}
      />
    );
  }
  if (Array.isArray(data) && data.length === 0) {
    return <NoConnection />;
  }
  return (
    <View
      style={{
        marginHorizontal: horizontalScale(12),
        flex: 1,
      }}
    >
      <SearchInput
        placeholder="ابحث عن أحد الكادر التدريسي..."
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setResults={setResults}
        options={options}
        list={data}
        style={{ marginTop: verticalScale(12) }}
      />
      {results.length > 0 && searchInput.length > 0 ? (
        <FlashList
          keyboardShouldPersistTaps="always"
          data={results}
          estimatedItemSize={65}
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
              fontSize: moderateScale(24),
              marginTop: verticalScale(40),
              color: textColor,
            }}
          >
            لا يوجد نتائج
          </Text>
        </>
      ) : (
        <FlashList
          data={data}
          keyboardShouldPersistTaps="always"
          estimatedItemSize={65}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => (
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
  );
};

export default DoctorsScreen;
