import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";

interface InfoItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subTitle: string;
  onPress: () => void;
}

const InfoItem = ({ icon, title, subTitle, onPress }: InfoItemProps) => {
  const { theme } = useContext(ThemeContext);
  const textColor =
    theme === "light" ? Colors.lightTextColor : Colors.darkTextColor;
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Feather name={icon} color={textColor} size={26} />
        <View style={{ marginStart: 12 }}>
          <Text
            style={[
              styles.title,
              {
                color: textColor,
              },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.subTitle,
              {
                color: textColor,
              },
            ]}
          >
            {subTitle}
          </Text>
        </View>
      </View>
      <Feather name="arrow-left" color={textColor} size={20} />
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
