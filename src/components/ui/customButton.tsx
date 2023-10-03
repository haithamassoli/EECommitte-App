import { vs } from "@Utils/Platform";
import { Button } from "react-native-paper";

const CustomButton = ({
  onPress,
  title,
  mode = "contained",
  style,
  labelStyle,
}: {
  onPress: () => void;
  title: string;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: any;
  labelStyle?: any;
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      contentStyle={{
        height: vs(46),
      }}
      labelStyle={{
        ...labelStyle,
      }}
      style={{
        ...style,
      }}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
