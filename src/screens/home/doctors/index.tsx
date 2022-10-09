import { Text, View, ActivityIndicator, RefreshControl } from "react-native";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useLayoutEffect, useState } from "react";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import DoctorCard from "@Components/DoctorCard";
import { FlashList } from "@shopify/flash-list";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { fetchDoctors } from "@Src/api/fetchDoctors";
import NoConnection from "@Components/NoConnection";
import BannerAdmob from "@Components/BannerAdmob";

type Props = StackScreenProps<HomeStackParamList, "Doctors">;

const options = {
  keys: ["name", "name2"],
};

const DoctorsScreen = ({ route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const { data, isLoading, refetch, isFetching }: any =
    fetchDoctors(refetchCounter);

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
    return <NoConnection refetch={refetch} />;
  }
  return (
    <View
      style={{
        marginHorizontal: horizontalScale(12),
        flex: 1,
      }}
    >
      <BannerAdmob position="top" />
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
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                if (refetchCounter === 0) {
                  setRefetchCounter(1);
                }
              }}
            />
          }
          keyboardShouldPersistTaps="always"
          data={results}
          estimatedItemSize={65}
          keyExtractor={(item): any => item.id.toString()}
          renderItem={({ item }: any) => (
            <DoctorCard
              // @ts-ignore
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
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          keyboardShouldPersistTaps="always"
          estimatedItemSize={65}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }: any) => (
            <DoctorCard
              // @ts-ignore
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
      <BannerAdmob position="bottom" />
    </View>
  );
};

export default DoctorsScreen;
