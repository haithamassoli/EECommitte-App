import {
  Text,
  Image,
  ScrollView,
  View,
  Pressable,
  Linking,
} from "react-native";
import DoctorsData from "@Src/data/Doctors";
import { Doctor } from "@Types/index";
import SearchInput from "@Components/ui/SearchInput";
import { useState } from "react";

const options = {
  keys: ["name", "name2"],
};
const DoctorsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [results, setResults] = useState<Doctor[] | []>([]);
  return (
    <>
      <ScrollView>
        <SearchInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchBarFocused={searchBarFocused}
          setSearchBarFocused={setSearchBarFocused}
          results={results}
          setResults={setResults}
          options={options}
          list={DoctorsData}
        />
        {DoctorsData.map((doctor: Doctor) => (
          <View key={doctor.id}>
            <Text>{doctor?.name}</Text>
            <Text>{doctor?.name2}</Text>
            <Text>{doctor?.office}</Text>
            <Pressable
              onPress={() =>
                Linking.openURL(`tel:${doctor?.phone?.split(" ")[1]}`)
              }
            >
              <Text>{doctor?.phone}</Text>
            </Pressable>

            <Pressable
              onPress={() => Linking.openURL(`mailto:${doctor?.email}`)}
            >
              <Text>{doctor?.email}</Text>
            </Pressable>
            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{ uri: doctor?.image }}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default DoctorsScreen;
