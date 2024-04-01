import {
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import SearchInput from "@Components/ui/SearchInput";
import { useLayoutEffect, useState } from "react";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import DoctorCard from "@Components/DoctorCard";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { fetchDoctors } from "@Src/api/fetchDoctors";
import NoConnection from "@Components/NoConnection";
import { Shadow } from "react-native-shadow-2";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = StackScreenProps<HomeStackParamList, "Doctors">;

const options = {
  keys: ["name", "name2"],
};

const DoctorsScreen = ({ navigation, route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const shadowColor =
    theme === "light" ? Colors.lightShadow : Colors.darkShadow;
  const { data, isLoading, isFetching }: any = fetchDoctors(refetchCounter);

  useLayoutEffect(() => {
    if (route.params.doctorId && Array.isArray(data)) {
      const doctor = data.find(
        (doctor: any) => doctor.id === route.params.doctorId
      );
      if (doctor) {
        setSearchInput(doctor.name);
        setResults([doctor]);
      }
    }
  }, [route.params.doctorId, isLoading]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground() {
        return null;
      },
    });
  }, []);
  const handleRefetch = () => {
    setRefetchCounter(0);
    setRefetchCounter((prev) => prev + 1);
  };

  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInUp.duration(600).delay(200 * index)}>
      <DoctorCard
        // @ts-ignore
        email={item.email}
        image={item.image}
        name={item.name}
        office={item.office}
        phone={item.phone}
        website={item.website}
      />
    </Animated.View>
  );
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
    return <NoConnection refetch={handleRefetch} />;
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Shadow
        distance={12}
        startColor={shadowColor}
        endColor="rgba(0, 0, 0, 0)"
        sides={{
          top: false,
          bottom: true,
          end: false,
          start: false,
        }}
        containerStyle={{
          zIndex: 1,
        }}
      >
        <SearchInput
          placeholder="ابحث عن أحد الكادر التدريسي..."
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setResults={setResults}
          options={options}
          list={data}
          style={{
            marginTop: verticalScale(6),
            marginBottom: verticalScale(4),
            marginHorizontal: horizontalScale(12),
          }}
        />
      </Shadow>
      {results.length > 0 && searchInput.length > 0 ? (
        <View style={{ flex: 1, marginHorizontal: horizontalScale(12) }}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: verticalScale(12),
            }}
            keyboardShouldPersistTaps="always"
            data={results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
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
        <View style={{ flex: 1, marginHorizontal: horizontalScale(12) }}>
          <FlatList
            data={data}
            contentContainerStyle={{ paddingBottom: verticalScale(12) }}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={() => {
                  if (refetchCounter === 0) {
                    setRefetchCounter(1);
                  }
                }}
                colors={
                  theme === "light" ? [Colors.primary700] : [Colors.primary400]
                }
                progressBackgroundColor={
                  theme === "light"
                    ? Colors.lightBackgroundSec
                    : Colors.darkBackgroundSec
                }
                tintColor={
                  theme === "light" ? Colors.primary700 : Colors.primary400
                }
              />
            }
            keyboardShouldPersistTaps="always"
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

export default DoctorsScreen;
