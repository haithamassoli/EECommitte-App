import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import InfoItem from "@Components/infoItem";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import Colors from "@GlobalStyle/Colors";

const InfoScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
  function onPress() {
    console.log("onPress");
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => toggleTheme()}>
          <Text style={{ color: textColor }}>Change Theme</Text>
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            {
              color: textColor,
            },
          ]}
        >
          Account Setting
        </Text>
        <InfoItem
          icon="user"
          title="Profile Information"
          subTitle="Change your account information"
          onPress={onPress}
        />
        <InfoItem
          icon="star"
          title="Adress"
          subTitle="Add your delivery location"
          onPress={onPress}
        />
        <InfoItem
          icon="share"
          title="Refer and Share App"
          subTitle="Change your account information"
          onPress={onPress}
        />
        <Text
          style={[
            styles.headerTitle,
            {
              color: textColor,
            },
          ]}
        >
          More
        </Text>
        <InfoItem
          icon="info"
          title="FAQ"
          subTitle="Frequently asked questions"
          onPress={onPress}
        />
        <InfoItem
          icon="heart"
          title="Support US"
          subTitle="Help us to improve our app"
          onPress={onPress}
        />
        <InfoItem
          icon="star"
          title="Rate Us"
          subTitle="Rate us on the app store"
          onPress={onPress}
        />
      </ScrollView>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
  },
});
