import { View, Text } from "react-native";
import { useLayoutEffect, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import CustomHeader from "@Components/ui/CustomHeader";

type Props = StackScreenProps<HomeStackParamList, "Favorite">;

const RegestrationScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/registration.png")
      : require("@Assets/images/icons/dark-icons/registration.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "ما يخص التسجيل",
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
      <Text>RegestrationScreen</Text>
    </View>
  );
};

export default RegestrationScreen;
