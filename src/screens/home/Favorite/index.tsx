import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext } from "react";
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
          style={[
            styles.button,
            {
              backgroundColor:
                theme === "light"
                  ? Colors.lightBackgroundSec
                  : Colors.darkBackgroundSec,
            },
          ]}
          onPress={() => navigation.navigate("Subject", { subjectId: item.id })}
        >
          <Text
            style={[
              styles.text,
              {
                color: textColor,
              },
            ]}
          >
            {item?.name}
          </Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => toggleFavorite(item)}
          >
            <Text style={styles.removeButtonText}>إزالة من المفضلة</Text>
            <Feather
              name="trash-2"
              size={moderateScale(18)}
              color={"#F31313"}
              style={{
                textAlign: "center",
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  button: {
    width: "95%",
    height: verticalScale(100),
    alignSelf: "center",
    marginBottom: verticalScale(10),
    borderRadius: 10,
    padding: 10,
  },
  text: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: moderateScale(24),
    fontFamily: "Bukra",
  },
  removeButton: {
    width: "50%",
    // backgroundColor: "#FCECEC",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F31313",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    textAlign: "center",
    fontSize: moderateScale(18),
    color: "#F31313",
    fontFamily: "Dubai",
    paddingHorizontal: moderateScale(10),
  },
});
