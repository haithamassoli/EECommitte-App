import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Doctor } from "@Types/index";
import { useContext } from "react";
import { View, Text, Pressable, Image, Linking } from "react-native";

type Props = Omit<Doctor, "id" | "name2">;
const defaultImage = require("@Assets/images/profile-image.jpg");

const DoctorCard = ({ name, image, office, phone, email, website }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 10,
        width: "100%",
      }}
    >
      <Image
        style={{
          width: 100,
          height: "100%",
          marginEnd: 12,
        }}
        defaultSource={defaultImage}
        source={{ uri: image }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ color: textColor, textAlign: "left" }}>
          الإسم: {name}
        </Text>
        <Text style={{ color: textColor, textAlign: "left" }}>
          المكتب: {office}
        </Text>
        <Pressable
          onPress={() => Linking.openURL(`tel:${phone?.split(" ")[1]}`)}
        >
          <Text style={{ color: textColor, textAlign: "left" }}>
            الهاتف: {phone}
          </Text>
        </Pressable>

        <Pressable onPress={() => Linking.openURL(`mailto:${email}`)}>
          <Text style={{ color: textColor, textAlign: "left" }}>
            البريد الإلكتروني
          </Text>
          <Text style={{ color: textColor, textAlign: "left" }}>{email}</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: Colors.primary400,
            padding: 5,
            borderRadius: 5,
            marginVertical: 5,
            alignSelf: "center",
          }}
          onPress={() => Linking.openURL(website)}
        >
          <Text style={{ color: textColor, textAlign: "left" }}>
            الموقع الإلكتروني
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DoctorCard;
