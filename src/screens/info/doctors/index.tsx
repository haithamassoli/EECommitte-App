import {
  Text,
  Image,
  ScrollView,
  View,
  Pressable,
  Linking,
  Keyboard,
} from "react-native";
import DoctorsData from "@Src/data/Doctors";
import { Doctor } from "@Types/index";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useState } from "react";
import Overlay from "@Components/Overlay";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";

const options = {
  keys: ["name", "name2"],
};
const DoctorsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [results, setResults] = useState<Doctor[] | []>([]);
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
  return (
    <>
      <ScrollView style={{ marginHorizontal: 12 }}>
        <SearchInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchBarFocused={searchBarFocused}
          setSearchBarFocused={setSearchBarFocused}
          results={results}
          setResults={setResults}
          options={options}
          list={DoctorsData}
          style={{ marginTop: 12 }}
        />
        {/* <Overlay onPress={() => Keyboard.dismiss()} /> */}
        {DoctorsData.map((doctor: Doctor) => (
          <View
            key={doctor.id}
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                marginEnd: 12,
              }}
              source={{ uri: doctor?.image }}
            />
            <View>
              <Text style={{ color: textColor, textAlign: "left" }}>
                الإسم: {doctor?.name}
              </Text>
              <Text style={{ color: textColor, textAlign: "left" }}>
                الإسم: {doctor?.name2}
              </Text>
              <Text style={{ color: textColor, textAlign: "left" }}>
                المكتب: {doctor?.office}
              </Text>
              <Pressable
                onPress={() =>
                  Linking.openURL(`tel:${doctor?.phone?.split(" ")[1]}`)
                }
              >
                <Text style={{ color: textColor, textAlign: "left" }}>
                  الهاتف: {doctor?.phone}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => Linking.openURL(`mailto:${doctor?.email}`)}
              >
                <Text style={{ color: textColor, textAlign: "left" }}>
                  البريد الإلكتروني {doctor?.email}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default DoctorsScreen;
