import { View, Text } from "react-native";
import { useContext, useLayoutEffect } from "react";
import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { HomeStackParamList } from "@Types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import CustomHeader from "@Components/ui/CustomHeader";

type Props = StackScreenProps<HomeStackParamList, "FAQ">;

const FAQScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/faq.png")
      : require("@Assets/images/icons/dark-icons/faq.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "الأسئلة الشائعة",
      headerTitleStyle: {
        fontFamily: "Bukra",
      },
      headerLeft: () => (
        <CustomHeader
          onPress={() => navigation.goBack()}
          iconColor={iconColor}
        />
      ),
    });
  }, []);
  return (
    <View>
      <Text>FAQScreen</Text>
    </View>
  );
};

export default FAQScreen;
