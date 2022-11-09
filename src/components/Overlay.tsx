import { Pressable, StyleSheet } from "react-native";
import Colors from "@GlobalStyle/Colors";
import { memo } from "react";

type Props = {
  onPress: () => void;
};
const Overlay = ({ onPress }: Props) => {
  return <Pressable onPress={onPress} style={styles.container}></Pressable>;
};

export default memo(Overlay);
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.overlay,
    zIndex: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
