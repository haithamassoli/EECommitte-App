import { createContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const ScreenSizeContext = createContext({
  screenWidth: Dimensions.get("window").width,
  screenHeight: Dimensions.get("window").height,
});

export const ScreenSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenWidth(result.screen.width);
      setScreenHeight(result.screen.height);
    };
    Dimensions.addEventListener("change", onChange);
  }, []);

  return (
    <ScreenSizeContext.Provider
      value={{
        screenWidth,
        screenHeight,
      }}
    >
      {children}
    </ScreenSizeContext.Provider>
  );
};
