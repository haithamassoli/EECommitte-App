import {
  Text,
  Image,
  ScrollView,
  View,
  Pressable,
  Linking,
} from "react-native";
import DoctorsData from "@Src/data/Doctors";
import { Doctors } from "@Types/index";
const DoctorsScreen = () => {
  return (
    <>
      <ScrollView>
        {DoctorsData.map((doctor: Doctors) => (
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
