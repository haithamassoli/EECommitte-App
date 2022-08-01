import { ScrollView, Text, StyleSheet, View, Pressable } from "react-native";
import InfoItem from "@Components/infoItem";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import Colors from "@GlobalStyle/Colors";

const InfoScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  function onPress() {
    console.log("onPress");
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => toggleTheme()}>
          <Text style={{ color:
            theme === "light" ? Colors.lightTextColor : Colors.darkTextColor,}}>Change Theme</Text>
        </Pressable>
        <Text
          style={[
            styles.headerTitle,
            {
              color:
                theme === "light"
                  ? Colors.lightTextColor
                  : Colors.darkTextColor,
            },
          ]}
        >
          Account Setting
        </Text>
        <InfoItem
          icon="person-outline"
          title="Profile Information"
          subTitle="Change your account information"
          onPress={onPress}
        />
        <InfoItem
          icon="card-outline"
          title="Payment Information"
          subTitle="Payment Information"
          onPress={onPress}
        />
        <InfoItem
          icon="star-outline"
          title="Adress"
          subTitle="Add your delivery location"
          onPress={onPress}
        />
        <InfoItem
          icon="notifications-outline"
          title="Notifications"
          subTitle="Set notification you want to receive"
          onPress={onPress}
        />
        <InfoItem
          icon="share-social-outline"
          title="Refer and Share App"
          subTitle="Change your account information"
          onPress={onPress}
        />
        <Text style={[styles.headerTitle, { color:
            theme === "light" ? Colors.lightTextColor : Colors.darkTextColor,}]}>More</Text>
        <InfoItem
          icon="information-circle-outline"
          title="FAQ"
          subTitle="Frequently asked questions"
          onPress={onPress}
        />
        <InfoItem
          icon="help-buoy-outline"
          title="Support"
          subTitle="24/7 support"
          onPress={onPress}
        />
        <InfoItem
          icon="star-outline"
          title="Rate Us"
          subTitle="Rate us on the app store"
          onPress={onPress}
        />
        <InfoItem
          icon="log-out-outline"
          title="Logout"
          subTitle="Logout from your account"
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
