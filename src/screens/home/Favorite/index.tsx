import { Swipeable } from "react-native-gesture-handler";
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
import { Feather } from "@expo/vector-icons";

type Props = StackScreenProps<HomeStackParamList, "Favorite">;

const FavoriteScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { favorite, toggleFavorite } = useContext(FavoriteContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(16),
      }}
    >
      {favorite.map((item) => (
        <View
          key={item.id}
          style={{
            paddingHorizontal: moderateScale(16),
          }}
        >
          <Swipeable
            activeOffsetX={[-100, 200]}
            renderRightActions={() => (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => toggleFavorite(item)}
              >
                <Feather
                  name="trash-2"
                  size={moderateScale(18)}
                  color={"#fff"}
                />
              </TouchableOpacity>
            )}
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
                navigation.navigate("Subject", { subjectId: item.id })
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
                {item?.name}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        </View>
      ))}
      {favorite.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Bukra",
              fontSize: moderateScale(20),
              color: textColor,
            }}
          >
            لا يوجد مفضلة
          </Text>
        </View>
      ) : (
        <Text
          style={{
            fontFamily: "TajawalMedium",
            color: textColor,
            fontSize: moderateScale(12),
            marginTop: verticalScale(4),
            width: "100%",
            alignSelf: "flex-start",
            textAlign: "center",
          }}
        >
          اسحب لليسار للحذف
        </Text>
      )}
    </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  button: {
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(16),
    width: "94%",
    alignSelf: "center",
    height: verticalScale(114),
  },
  text: {
    flex: 1,
    textAlign: "center",
    lineHeight: verticalScale(114),
    fontSize: moderateScale(24),
    fontFamily: "Bukra",
  },
  removeButton: {
    overflow: "hidden",
    width: "30%",
    height: verticalScale(114),
    borderRadius: moderateScale(16),
    backgroundColor: "#F31313",
    justifyContent: "center",
    alignItems: "center",
  },
});
