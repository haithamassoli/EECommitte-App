import FirstLoading from "@Components/FirstLoading";
import { StackScreenProps } from "@react-navigation/stack";
import { InfoStackParamList } from "@Types/navigation";
import { verticalScale } from "@Utils/Platform";
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
          height: verticalScale(64),
        },
      });
    };
  }, []);
  const onFinish = () => navigation.navigate("Info");
  return <FirstLoading onFinished={onFinish} />;
};

export default AboutEECommitteScreen;
