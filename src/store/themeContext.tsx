import { getDataMMKV, storeDataMMKV } from "@Utils/Helper";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const getTheme = () => {
      const theme = getDataMMKV("theme");
      if (theme) {
        setTheme(theme);
      }
    };
    getTheme();
  }, []);
  const toggleTheme = () => {
    storeDataMMKV("theme", theme === "dark" ? "light" : "dark");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
