import { View, Text, Image } from "react-native";
import DoctorsData from "@Src/data/Doctors";
import { Doctors } from "@Types/index";
const DoctorsScreen = () => {
  return (
    <>
      {DoctorsData.map((doctor: Doctors) => (
        <View key={doctor.id}>
          <Text>{doctor?.name}</Text>
          <Text>{doctor?.name2}</Text>
          <Text>{doctor?.office}</Text>
          <Text>{doctor?.phone}</Text>
          <Text>{doctor?.email}</Text>
          <Image source={{ uri: doctor?.image }} />
        </View>
      ))}
    </>
  );
};

export default DoctorsScreen;
