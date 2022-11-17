import FirstLoading from "@Components/FirstLoading";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";
import { isIOS } from "@Utils/Platform";
import { useLayoutEffect } from "react";

type Props = StackScreenProps<InfoStackParamList, "AboutEECommitte">;

const AboutEECommitteScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
          minHeight: isIOS ? "9%" : "8.5%",
        },
        tabBarBackground() {
          return null;
        },
      });
    };
  }, []);
  const onFinish = () => navigation.navigate("Info");
  return <FirstLoading onFinished={onFinish} />;
};

export default AboutEECommitteScreen;
