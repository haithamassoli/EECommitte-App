import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useLayoutEffect, useContext } from "react";
import CustomHeader from "@Components/ui/CustomHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "@Types/navigation";
import { ThemeContext } from "@Src/store/themeContext";
import Colors from "@GlobalStyle/Colors";
import { FavoriteContext } from "@Src/store/favoriteContext";
import { moderateScale, verticalScale } from "@Utils/Platform";
import { screenHeight } from "@Utils/Helper";
import { Feather } from "@expo/vector-icons";

type Props = StackScreenProps<HomeStackParamList, "Favorite">;

const FavoriteScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { favorite, toggleFavorite } = useContext(FavoriteContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  const iconColor =
    theme === "light"
      ? require("@Assets/images/icons/light-icons/about-subject.png")
      : require("@Assets/images/icons/dark-icons/about-subject.png");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "المفضلة",
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
    <ScrollView style={{ flex: 1 }}>
      {favorite.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
            width: "95%",
            height: verticalScale(100),
            alignSelf: "center",
            marginBottom: verticalScale(10),
            borderRadius: 10,
            padding: 10,
          }}
          onPress={() =>
            navigation.getParent()?.navigate("SubjectsNavigation", {
              screen: "Subject",
              params: { subjectId: item.id },
            })
          }
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              textAlignVertical: "center",
              fontSize: moderateScale(24),
              color: textColor,
              fontFamily: "Bukra",
            }}
          >
            {item?.name}
          </Text>
          <TouchableOpacity onPress={() => toggleFavorite(item)}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: moderateScale(12),
                  color: "#F31313",
                  fontFamily: "Bukra",
                }}
              >
                إزالة من المفضلة
              </Text>
              <Feather
                name="trash-2"
                size={moderateScale(24)}
                color={"#F31313"}
                style={{
                  textAlign: "center",
                }}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FavoriteScreen;
