import FirstLoading from "@Components/FirstLoading";
import Colors from "@GlobalStyle/Colors";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "@Src/store/themeContext";
import { InfoStackParamList } from "@Types/navigation";
import { horizontalScale, verticalScale } from "@Utils/Platform";
import { useContext, useLayoutEffect } from "react";
import { useWindowDimensions } from "react-native";

type Props = StackScreenProps<InfoStackParamList, "AboutEECommitte">;

const AboutEECommitteScreen = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);
  const tabBarBackground =
    theme === "light" ? Colors.lightBackground : Colors.darkBackground;
  const { width, height } = useWindowDimensions();
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
          position: width > height ? "absolute" : "relative",
          top: width > height ? "42%" : 0,
          transform: [
            { rotate: width > height ? "270deg" : "0deg" },
            {
              translateY: width > height ? horizontalScale(228) : 0,
            },
          ],
          height: width > height ? "20%" : verticalScale(64),
          width: width > height ? height : "100%",
          backgroundColor: tabBarBackground,
        },
      });
    };
  }, []);
  const onFinish = () => navigation.navigate("Info");
  return <FirstLoading onFinished={onFinish} />;
};

export default AboutEECommitteScreen;
