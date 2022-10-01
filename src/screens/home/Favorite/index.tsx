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
      ? require("@Assets/images/icons/light-icons/fav.png")
      : require("@Assets/images/icons/dark-icons/fav.png");

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
    <ScrollView style={{ flex: 1, paddingTop: verticalScale(16) }}>
      {favorite.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: screenHeight,
          }}
        >
          <Text
            style={{
              fontFamily: "Bukra",
              fontSize: moderateScale(20),
              color: textColor,
              paddingBottom: verticalScale(180),
            }}
          >
            لا يوجد مفضلة
          </Text>
        </View>
      )}
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
                  fontSize: moderateScale(18),
                  color: "#F31313",
                  fontFamily: "TajawalRegular",
                  paddingHorizontal: moderateScale(10),
                }}
              >
                إزالة من المفضلة
              </Text>
              <Feather
                name="trash-2"
                size={moderateScale(18)}
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
