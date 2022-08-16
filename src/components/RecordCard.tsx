import Colors from "@GlobalStyle/Colors";
import { Record } from "@Types/index";
import { screenWidth } from "@Utils/Helper";
import { View, Text, Pressable, Linking, Image } from "react-native";

type Props = Omit<Record, "id" | "searchName">;

const RecordCard = ({ link, image, subject, doctor }: Props) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
      }}
      onPress={() => Linking.openURL(link)}
    >
      <Image
        style={{
          width: screenWidth * 0.42,
          height: 100,
        }}
        source={image}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          padding: 10,
          backgroundColor: Colors.lightGray,
          height: 100,
          marginStart: 10,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Bukra",
            textAlign: "left",
          }}
        >
          {subject}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Bukra",
          }}
        >
          {doctor}
        </Text>
      </View>
    </Pressable>
  );
};

export default RecordCard;
