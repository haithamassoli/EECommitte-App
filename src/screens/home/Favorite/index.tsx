import { View, Text } from "react-native";
import { useLayoutEffect, useContext } from "react";
import CustomHeader from "@Components/ui/CustomHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { FavoriteContext } from "@Src/store/favoriteContext";

type Props = StackScreenProps<HomeStackParamList, "Favorite">;

const FavoriteScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { favorite } = useContext(FavoriteContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  console.log(favorite);
  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/doctors.png")
      : require("@Assets/images/icons/dark-icons/doctors.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "الكادر التدريسي",
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
      {favorite.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
      <Text>FavoriteScreen</Text>
    </View>
  );
};

export default FavoriteScreen;
