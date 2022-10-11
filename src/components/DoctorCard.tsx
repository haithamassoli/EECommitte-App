import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { useContext } from "react";
import { View, Text, Image, Linking, TouchableOpacity } from "react-native";

const defaultImage = require("@Assets/images/person-placeholder.jpg");

const DoctorCard = ({ name, image, office, phone, email, website }: any) => {
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
        marginVertical: verticalScale(10),
        width: "100%",
        backgroundColor,
        paddingStart: horizontalScale(10),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(10),
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
        {office && (
          <Text
            style={{
              color: textColor,
              textAlign: "left",
              fontSize: moderateScale(14),
            }}
          >
            المكتب: {office}
          </Text>
        )}
        {phone && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phone?.split(" ")[1]}`)}
            style={{ overflow: "hidden" }}
          >
            <Text
              style={{
                backgroundColor: Colors.primaryLight,
                borderRadius: moderateScale(10),
                color: Colors.lightText,
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
        )}
        <View
          style={{
            backgroundColor: Colors.primaryLight,
            borderRadius: moderateScale(10),
            marginEnd: horizontalScale(20),
            paddingVertical: verticalScale(6),
            marginVertical: verticalScale(8),
          }}
        >
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
            <Text
              style={{
                color: Colors.lightText,
                textAlign: "left",
                fontSize: moderateScale(14),
                paddingEnd: horizontalScale(10),
              }}
            >
              البريد الإلكتروني
            </Text>
            <Text
              style={{
                color: Colors.lightText,
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
            borderRadius: moderateScale(10),
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
