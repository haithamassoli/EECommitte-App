import { View, Text, TouchableOpacity } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@Src/store/themeContext";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";

type Props = StackScreenProps<InfoStackParamList, "SupportUs">;

const SupportUsScreen = ({ navigation }: Props) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "الدعم",
      headerLeft: () => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="arrow-right"
            size={24}
            color={textColor}
            style={{ paddingHorizontal: 10 }}
          />
          <Feather name="heart" size={24} color={textColor} />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              paddingRight: horizontalScale(16),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Search");
              }}
            >
              <Feather
                name="search"
                size={moderateScale(24)}
                color={textColor}
                style={{ paddingHorizontal: horizontalScale(12) }}
              />
            </TouchableOpacity>
            {theme === "light" ? (
              <TouchableOpacity onPress={() => toggleTheme()}>
                <Feather
                  name="moon"
                  size={moderateScale(24)}
                  color={textColor}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => toggleTheme()}>
                <Feather
                  name="sun"
                  size={moderateScale(24)}
                  color={textColor}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      },
    });
  }, [theme]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: "TajawalBold",
          fontSize: moderateScale(26),
          textAlign: "center",
          marginTop: verticalScale(20),
          color: textColor,
        }}
      >
        شكراً لوصولك هنا
      </Text>
      <Text
        style={{
          fontFamily: "Dubai",
          paddingHorizontal: horizontalScale(20),
          fontSize: moderateScale(20),
          textAlign: "center",
          marginTop: verticalScale(8),
          color: textColor,
        }}
      >
        أشكرك لمجرد وصولك إلى هنا لدعمنا نحتاج دعوتك الجميلة فقط :)
      </Text>
      <Ionicons
        name="heart"
        size={moderateScale(270)}
        color={Colors.secondYear}
        style={{ marginTop: verticalScale(20) }}
      />
    </View>
  );
};

export default SupportUsScreen;
