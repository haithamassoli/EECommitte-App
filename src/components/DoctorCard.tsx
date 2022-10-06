import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Doctor } from "@Types/index";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext } from "react";
import { View, Text, Image, Linking, TouchableOpacity } from "react-native";

type Props = Omit<Doctor, "id" | "name2">;
const defaultImage = require("@Assets/images/profile-image.webp");

const DoctorCard = ({ name, image, office, phone, email, website }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: horizontalScale(20),
        marginVertical: verticalScale(10),
        width: "100%",
      }}
    >
      <Image
        style={{
          width: horizontalScale(100),
          height: verticalScale(150),
          marginEnd: horizontalScale(12),
          borderRadius: moderateScale(12),
        }}
        defaultSource={defaultImage}
        source={{ uri: image }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: textColor,
            textAlign: "left",
            fontSize: moderateScale(14),
          }}
        >
          الإسم: {name}
        </Text>
        <Text
          style={{
            color: textColor,
            textAlign: "left",
            fontSize: moderateScale(14),
          }}
        >
          المكتب: {office}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${phone?.split(" ")[1]}`)}
          style={{ overflow: "hidden" }}
        >
          <Text
            style={{
              backgroundColor,
              borderRadius: moderateScale(10),
              color: textColor,
              textAlign: "left",
              fontSize: moderateScale(14),
              marginEnd: horizontalScale(20),
              paddingEnd: horizontalScale(10),
              paddingVertical: verticalScale(6),
              marginTop: verticalScale(8),
            }}
          >
            الهاتف: {phone}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor,
            borderRadius: moderateScale(10),
            marginEnd: horizontalScale(20),
            paddingVertical: verticalScale(6),
            marginVertical: verticalScale(8),
          }}
        >
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
            <Text
              style={{
                color: textColor,
                textAlign: "left",
                fontSize: moderateScale(14),
                paddingEnd: horizontalScale(10),
              }}
            >
              البريد الإلكتروني
            </Text>
            <Text
              style={{
                color: textColor,
                textAlign: "left",
                fontSize: moderateScale(14),
                paddingEnd: horizontalScale(10),
              }}
            >
              {email}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary400,
            padding: moderateScale(5),
            borderRadius: moderateScale(5),
            marginVertical: verticalScale(5),
            alignSelf: "center",
          }}
          onPress={() => Linking.openURL(website)}
        >
          <Text
            style={{
              color: Colors.lightText,
              textAlign: "left",
              fontSize: moderateScale(14),
            }}
          >
            الموقع الإلكتروني
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorCard;
