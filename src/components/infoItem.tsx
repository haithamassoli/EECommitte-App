import { View, Text, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";

interface InfoItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subTitle: string;
  onPress: () => void;
}

const InfoItem = ({ icon, title, subTitle, onPress }: InfoItemProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Ionicons
          name={icon}
          color={
            theme === "light" ? Colors.lightTextColor : Colors.darkTextColor
          }
          size={26}
        />
        <View style={{ marginStart: 12 }}>
          <Text
            style={[
              styles.title,
              {
                color:
                  theme === "light"
                    ? Colors.lightTextColor
                    : Colors.darkTextColor,
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {
                color:
                  theme === "light"
                    ? Colors.lightTextColor
                    : Colors.darkTextColor,
              },
            ]}
          >
            {subTitle}
          </Text>
        </View>
      </View>
      <Feather
        name="arrow-left"
        color={theme === "light" ? Colors.lightTextColor : Colors.darkTextColor}
        size={20}
      />
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  subTitle: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "left",
  },
});
