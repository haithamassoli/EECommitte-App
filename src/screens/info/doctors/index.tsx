import {
  Text,
  Image,
  ScrollView,
  View,
  Pressable,
  Linking,
  ActivityIndicator,
} from "react-native";
import DoctorsData from "@Src/data/Doctors";
import { Doctor } from "@Types/index";
import SearchInput from "@Components/ui/SearchInput";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";

type Props = StackScreenProps<InfoStackParamList, "Doctors">;

const options = {
  keys: ["name", "name2"],
};
const DoctorsScreen = ({ route }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Doctor[] | []>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;

  useEffect(() => {
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
      <ActivityIndicator style={{ flex: 1 }} size="large" color={Colors.gray} />
    );
  }
  return (
    <>
      {loading}
      <ScrollView style={{ marginHorizontal: 12 }}>
        <SearchInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setResults={setResults}
          options={options}
          list={DoctorsData}
          style={{ marginTop: 12 }}
        />
        {results.length > 0 && searchInput.length > 0 ? (
          results.map((doctor) => (
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
          ))
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
          DoctorsData.map((doctor: Doctor) => (
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
          ))
        )}
      </ScrollView>
    </>
  );
};

export default DoctorsScreen;
{
  /* {DoctorsData.map((doctor: Doctor) => (
        //   <View
        //     key={doctor.id}
        //     style={{
        //       flexDirection: "row",
        //       justifyContent: "flex-start",
        //       alignItems: "center",
        //       marginHorizontal: 20,
        //       marginVertical: 10,
        //     }}
        //   >
        //     <Image
        //       style={{
        //         width: 100,
        //         height: 100,
        //         marginEnd: 12,
        //       }}
        //       source={{ uri: doctor?.image }}
        //     />
        //     <View>
        //       <Text style={{ color: textColor, textAlign: "left" }}>
        //         الإسم: {doctor?.name}
        //       </Text>
        //       <Text style={{ color: textColor, textAlign: "left" }}>
        //         الإسم: {doctor?.name2}
        //       </Text>
        //       <Text style={{ color: textColor, textAlign: "left" }}>
        //         المكتب: {doctor?.office}
        //       </Text>
        //       <Pressable
        //         onPress={() =>
        //           Linking.openURL(`tel:${doctor?.phone?.split(" ")[1]}`)
        //         }
        //       >
        //         <Text style={{ color: textColor, textAlign: "left" }}>
        //           الهاتف: {doctor?.phone}
        //         </Text>
        //       </Pressable>

        //       <Pressable
        //         onPress={() => Linking.openURL(`mailto:${doctor?.email}`)}
        //       >
        //         <Text style={{ color: textColor, textAlign: "left" }}>
        //           البريد الإلكتروني {doctor?.email}
        //         </Text>
        //       </Pressable>
        //     </View>
        //   </View>
        // ))} */
}
