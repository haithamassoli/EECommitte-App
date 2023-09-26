import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { InfoStackParamList } from "@Types/navigation";
import { ms, vs } from "@Utils/Platform";
import { StackScreenProps } from "@react-navigation/stack";
import { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const list = [
  {
    id: 1,
    name: "صور الصفحة الرئيسية",
    navigation: "",
  },
  {
    id: 2,
    name: "أبرز الشروحات",
    navigation: "",
  },
  {
    id: 3,
    name: "الهيئة التدريسية",
    navigation: "",
  },
  {
    id: 4,
    name: "تسجيلات اللجنة",
    navigation: "",
  },
  {
    id: 5,
    name: "الأسئلة الشائعة",
    navigation: "",
  },
];
type Props = StackScreenProps<InfoStackParamList, "DashboardList">;

const DashboardListScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: vs(16),
        paddingBottom: vs(16),
      }}
    >
      {list.map((item) => (
        <View
          key={item.id}
          style={{
            paddingHorizontal: ms(16),
          }}
        >
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  theme === "light"
                    ? Colors.lightBackgroundSec
                    : Colors.darkBackgroundSec,
              },
            ]}
            onPress={() =>
              // @ts-ignore
              navigation.navigate(item.navigation)
            }
          >
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default DashboardListScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: vs(10),
    borderRadius: ms(16),
    width: "94%",
    alignSelf: "center",
    height: vs(114),
  },
  text: {
    flex: 1,
    textAlign: "center",
    lineHeight: vs(114),
    fontSize: ms(24),
    fontFamily: "Bukra",
  },
});
