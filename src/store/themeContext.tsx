import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import { isIOS } from "@Utils/Platform";
import {
  makeImageFromView,
  Image,
  Canvas,
  mix,
  vec,
  ImageShader,
  Circle,
  dist,
} from "@shopify/react-native-skia";
import type { SkImage } from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import type { ReactNode, RefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export type ColorSchemeName = "light" | "dark";

interface ColorScheme {
  active: boolean;
  theme: ColorSchemeName;
  statusBarStyle: ColorSchemeName;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
}

interface ColorSchemeContext extends ColorScheme {
  ref: RefObject<View>;
  transition: SharedValue<number>;
  circle: SharedValue<{ x: number; y: number; r: number }>;
  dispatch: (scheme: ColorScheme) => void;
}

const defaultValue: ColorScheme = {
  active: false,
  theme: "light",
  statusBarStyle: "light",
  overlay1: null,
  overlay2: null,
};

const ColorSchemeContext = createContext<ColorSchemeContext | null>(null);

const colorSchemeReducer = (_: ColorScheme, colorScheme: ColorScheme) => {
  return colorScheme;
};

export const useColorScheme = () => {
  const ctx = useContext(ColorSchemeContext);
  if (ctx === null) {
    throw new Error("No ColorScheme context context found");
  }
  const { theme, dispatch, ref, transition, circle, active } = ctx;
  const toggle = useCallback(
    async (x: number, y: number) => {
      const newColorScheme = theme === "light" ? "dark" : "light";

      if (!isIOS) {
        dispatch({
          active: false,
          theme: newColorScheme,
          overlay1: null,
          overlay2: null,
          statusBarStyle: newColorScheme,
        });
        storeDataMMKV("theme", newColorScheme);
        return;
      }

      dispatch({
        active: true,
        theme,
        overlay1: null,
        overlay2: null,
        statusBarStyle: newColorScheme,
      });
      // 0. Define the circle and its maximum radius
      const r = Math.max(...corners.map((corner) => dist(corner, { x, y })));
      circle.value = { x, y, r };

      // 1. Take the screenshot
      const overlay1 = await makeImageFromView(ref);
      // 2. display it
      dispatch({
        active: true,
        theme,
        overlay1,
        overlay2: null,
        statusBarStyle: newColorScheme,
      });
      // 3. switch to dark mode
      await wait(16);
      dispatch({
        active: true,
        theme: newColorScheme,
        overlay1,
        overlay2: null,
        statusBarStyle: newColorScheme,
      });
      // 4. wait for the dark mode to render
      await wait(16);
      // 5. take screenshot
      const overlay2 = await makeImageFromView(ref);
      dispatch({
        active: true,
        theme: newColorScheme,
        overlay1,
        overlay2,
        statusBarStyle: newColorScheme,
      });
      // 6. transition
      transition.value = 0;
      transition.value = withTiming(1, { duration: 650 });
      await wait(650);
      dispatch({
        active: false,
        theme: newColorScheme,
        overlay1: null,
        overlay2: null,
        statusBarStyle: newColorScheme === "light" ? "dark" : "light",
      });
      storeDataMMKV("theme", newColorScheme);
    },
    [circle, theme, dispatch, ref, transition]
  );
  return { theme, toggle, active };
};

interface ColorSchemeProviderProps {
  children: ReactNode;
}

const { width, height } = Dimensions.get("screen");
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const transition = useSharedValue(0);
  const ref = useRef(null);
  const [{ theme, overlay1, overlay2, active, statusBarStyle }, dispatch] =
    useReducer(colorSchemeReducer, defaultValue);
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });

  useEffect(() => {
    (() => {
      const theme = getDataMMKV("theme");
      dispatch({
        active: false,
        theme: theme || "light",
        overlay1: null,
        overlay2: null,
        statusBarStyle: theme || "light",
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={statusBarStyle} />
      <View ref={ref} style={{ flex: 1 }} collapsable={false}>
        <ColorSchemeContext.Provider
          value={{
            active,
            theme,
            overlay1,
            overlay2,
            dispatch,
            ref,
            transition,
            circle,
            statusBarStyle,
          }}
        >
          {children}
        </ColorSchemeContext.Provider>
      </View>
      {isIOS && (
        <Canvas style={StyleSheet.absoluteFill} pointerEvents={"none"}>
          <Image image={overlay1} x={0} y={0} width={width} height={height} />
          {overlay2 && (
            <Circle c={circle} r={r}>
              <ImageShader
                image={overlay2}
                x={0}
                y={0}
                width={width}
                height={height}
                fit="cover"
              />
            </Circle>
          )}
        </Canvas>
      )}
    </View>
  );
};
