import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { View, Text, Modal, Pressable } from "react-native";
import { useContext } from "react";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const CustomModal = ({ visible, setVisible, title }: Props) => {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "light" ? Colors.lightText : Colors.darkText;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor:
              theme === "light"
                ? Colors.lightBackgroundSec
                : Colors.darkBackgroundSec,
            width: "80%",
            height: 200,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Bukra",
              fontSize: 18,
              textAlign: "center",
              marginHorizontal: 20,
              color: textColor,
              lineHeight: 30,
            }}
          >
            {title}
          </Text>
          <Pressable
            onPress={() => setVisible(false)}
            style={{
              backgroundColor: Colors.primary400,
              width: "50%",
              height: 40,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Bukra",
                fontSize: 18,
                color: "white",
              }}
            >
              حسنا
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
