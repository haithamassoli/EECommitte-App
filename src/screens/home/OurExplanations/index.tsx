import NoConnection from "@Components/NoConnection";
import RecordCard from "@Components/RecordCard";
import SearchInput from "@Components/ui/SearchInput";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";
import { fetchExplanations } from "@Src/api/fetchExplanations";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { HomeStackParamList } from "@Types/navigation";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useState, useLayoutEffect } from "react";
import { View, Text, ActivityIndicator, RefreshControl } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Shadow } from "react-native-shadow-2";

const options = {
  keys: ["searchName", "subject", "doctor"],
};

type Props = StackScreenProps<HomeStackParamList, "OurExplanations">;

const OurExplanationsScreen = ({ navigation }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [refetchCounter, setRefetchCounter] = useState(0);
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const shadowColor =
    theme === "light" ? Colors.lightShadow : Colors.darkShadow;
  const { data, isLoading, isFetching }: any =
    fetchExplanations(refetchCounter);
  const handleRefetch = () => {
    setRefetchCounter(0);
    setRefetchCounter((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground() {
        return null;
      },
    });
  }, []);
  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInUp.duration(600).delay(200 * index)}>
      <RecordCard
        link={item.link}
        image={item.image}
        subject={item.subject}
        doctor={item.doctor}
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
          placeholder="ابحث عن شرح..."
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
          <FlashList
            data={results}
            contentContainerStyle={{ paddingBottom: verticalScale(12) }}
            estimatedItemSize={19}
            keyExtractor={(_, index) => index.toString()}
            keyboardShouldPersistTaps="always"
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
          <FlashList
            data={data}
            contentContainerStyle={{ paddingBottom: verticalScale(12) }}
            keyboardShouldPersistTaps="always"
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
            estimatedItemSize={19}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      )}
    </View>
  );
};

export default OurExplanationsScreen;
