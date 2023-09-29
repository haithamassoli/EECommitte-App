import FirstLoading from "@Components/FirstLoading";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { useColorScheme } from "@Src/store/themeContext";
import { InfoStackParamList } from "@Types/navigation";
import { isIOS } from "@Utils/Platform";
import { useLayoutEffect } from "react";

type Props = StackScreenProps<InfoStackParamList, "AboutEECommitte">;

const AboutEECommitteScreen = ({ navigation }: Props) => {
  const { theme } = useColorScheme();
  const tabBarBackground =
    theme === "light" ? Colors.lightBackground : Colors.darkBackground;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
      tabBarBackground() {
        return null;
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          minHeight: isIOS ? "8.8%" : "8.2%",
          backgroundColor: tabBarBackground,
        },
      });
    };
  }, []);
  const onFinish = () => navigation.navigate("Info");
  return <FirstLoading onFinished={onFinish} />;
};

export default AboutEECommitteScreen;
