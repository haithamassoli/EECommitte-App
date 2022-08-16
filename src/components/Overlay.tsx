import { Pressable } from "react-native";
import Colors from "@GlobalStyle/Colors";
import { memo } from "react";

type Props = {
  onPress: () => void;
};
const Overlay = ({ onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: Colors.overlay,
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    ></Pressable>
  );
};

export default memo(Overlay);
