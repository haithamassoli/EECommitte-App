import Colors from "@GlobalStyle/Colors";
import { useColorScheme } from "@Src/store/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const defaultImage = require("@Assets/images/person-placeholder.jpg");

const DoctorCard = ({ name, image, office, phone, email, website }: any) => {
  const { theme } = useColorScheme();
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image
        style={styles.image}
        placeholder={defaultImage}
        source={image}
        transition={400}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: textColor }]}>الإسم: {name}</Text>
        {office && (
          <Text style={[styles.name, { color: textColor }]}>
            المكتب: {office}
          </Text>
        )}
        {phone && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phone?.split(" ")[1]}`)}
            style={{
              overflow: "hidden",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingEnd: horizontalScale(10),
            }}
          >
            <Text style={[styles.name, { color: textColor }]}>
              الهاتف: {phone}
            </Text>
            <Feather
              name="phone-call"
              size={horizontalScale(16)}
              color={Colors.primary600}
            />
          </TouchableOpacity>
        )}
        <View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingEnd: horizontalScale(10),
            }}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          >
            <View>
              <Text style={[styles.name, { color: textColor }]}>
                البريد الإلكتروني:
              </Text>
              <Text style={[styles.name, { color: textColor }]}>{email}</Text>
            </View>
            <Feather
              name="mail"
              size={horizontalScale(16)}
              color={Colors.primary600}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.website}
          onPress={() => Linking.openURL(website)}
        >
          <Text style={styles.websiteText}>الموقع الإلكتروني</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: verticalScale(10),
    width: "100%",
    paddingStart: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
  },
  image: {
    width: horizontalScale(100),
    height: verticalScale(150),
    marginEnd: horizontalScale(12),
    borderRadius: moderateScale(12),
  },
  name: {
    textAlign: "left",
    fontSize: moderateScale(14),
  },
  phone: {
    backgroundColor: Colors.primaryLight,
    borderRadius: moderateScale(10),
    color: Colors.lightText,
    textAlign: "left",
    fontSize: moderateScale(14),
    marginEnd: horizontalScale(20),
    paddingEnd: horizontalScale(10),
    paddingVertical: verticalScale(6),
    marginTop: verticalScale(8),
  },
  linksContainer: {
    backgroundColor: Colors.primaryLight,
    borderRadius: moderateScale(10),
    marginEnd: horizontalScale(20),
    paddingVertical: verticalScale(6),
    marginVertical: verticalScale(8),
  },
  email: {
    color: Colors.lightText,
    textAlign: "left",
    fontSize: moderateScale(14),
    paddingEnd: horizontalScale(10),
  },
  website: {
    backgroundColor: Colors.primary400,
    padding: moderateScale(6),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(6),
    alignSelf: "center",
  },
  websiteText: {
    color: Colors.lightText,
    textAlign: "left",
    fontSize: moderateScale(14),
  },
});
