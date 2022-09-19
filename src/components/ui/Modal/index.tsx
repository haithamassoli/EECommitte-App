import Colors from "@GlobalStyle/Colors";
import { View, Text, Modal, Pressable } from "react-native";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const CustomModal = ({ visible, setVisible, title }: Props) => {
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
            backgroundColor: "white",
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
