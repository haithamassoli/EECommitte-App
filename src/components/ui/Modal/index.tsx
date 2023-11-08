import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { useContext } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { horizontalScale, moderateScale, verticalScale } from "@Utils/Platform";

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
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            ,
            {
              backgroundColor:
                theme === "light"
                  ? Colors.lightBackgroundSec
                  : Colors.darkBackgroundSec,
            },
          ]}
        >
          <Text style={[styles.modalText, { color: textColor }]}>{title}</Text>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.button}
          >
            <Text style={styles.textStyle}>حسنا</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    height: verticalScale(200),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontFamily: "Bukra",
    fontSize: moderateScale(18),
    textAlign: "center",
    marginHorizontal: horizontalScale(20),
    lineHeight: verticalScale(30),
  },
  button: {
    backgroundColor: Colors.primary400,
    width: "50%",
    height: verticalScale(40),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20),
  },
  textStyle: {
    fontFamily: "Bukra",
    fontSize: moderateScale(18),
    color: "white",
  },
});
