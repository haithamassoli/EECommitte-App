import Colors from "@GlobalStyle/Colors";
import { ThemeContext } from "@Src/store/themeContext";
import { hs, ms, vs } from "@Utils/Platform";
import React, {
  FC,
  RefObject,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

interface IProps {
  color: string;
  placeholderColor: string;
  backgroundColor: string;
  onDone: (param: { title?: string; url?: string }) => void;
  forwardRef: RefObject<any>;
}

export const InsertLinkModal: FC<IProps> = ({
  color,
  placeholderColor,
  backgroundColor,
  onDone,
  forwardRef,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { theme } = useContext(ThemeContext);
  const dataRef = useRef<{ title?: string; url?: string }>({});

  const setTitle = (title: string) => {
    dataRef.current.title = title;
  };

  const setURL = (url: string) => {
    dataRef.current.url = url;
  };

  const handleDone = () => {
    setModalVisible(false);
    onDone(dataRef.current);
  };

  useImperativeHandle(
    forwardRef,
    () => {
      return {
        setModalVisible,
      };
    },
    []
  );

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      coverScreen={false}
      isVisible={isModalVisible}
      backdropColor={color}
      backdropOpacity={0.3}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={[styles.dialog, { backgroundColor }]}>
        <View style={styles.linkTitle}>
          <Text style={{ color }}>إضافة رابط جديد</Text>
        </View>
        <View style={styles.item}>
          <TextInput
            style={[styles.input, { color }]}
            placeholderTextColor={placeholderColor}
            placeholder={"عنوان الرابط"}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.item}>
          <TextInput
            style={[styles.input, { color }]}
            placeholderTextColor={placeholderColor}
            placeholder="http(s)://"
            onChangeText={(text) => setURL(text)}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setModalVisible(false)}
          >
            <Text
              style={{
                color:
                  theme === "light" ? Colors.primary700 : Colors.primary500,
              }}
            >
              إلغاء
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleDone}>
            <Text
              style={{
                color:
                  theme === "light" ? Colors.primary700 : Colors.primary500,
              }}
            >
              إضافة
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: vs(40),
    alignItems: "center",
    paddingHorizontal: hs(15),
  },
  input: {
    flex: 1,
    height: vs(40),
    fontFamily: "TajawalMedium",
  },
  linkTitle: {
    height: vs(36),
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#b3b3b3",
  },
  dialog: {
    borderRadius: ms(8),
    marginHorizontal: hs(40),
    paddingHorizontal: hs(10),
  },

  buttonView: {
    flexDirection: "row",
    height: vs(36),
    paddingVertical: vs(4),
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.primary700,
  },
});
