import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { Record } from "@Types/index";
import { screenWidth } from "@Utils/Helper";
import { memo, useContext } from "react";
import { View, Text, Pressable, Linking, Image } from "react-native";

type Props = Omit<Record, "id" | "searchName">;

const RecordCard = ({ link, image, subject, doctor }: Props) => {
  const { theme } = useContext(ThemeContext);
  const backgroundColor =
    theme === "light" ? Colors.lightBackgroundSec : Colors.darkBackgroundSec;
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;
  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
      }}
      onPress={() => Linking.openURL(link)}
    >
      <Image
        style={{
          width: screenWidth * 0.42,
          height: 100,
        }}
        source={image}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          padding: 10,
          backgroundColor,
          height: 100,
          marginStart: 10,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Bukra",
            textAlign: "left",
            color: textColor,
          }}
        >
          {subject}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Bukra",
            color: textColor,
          }}
        >
          {doctor}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(RecordCard);
