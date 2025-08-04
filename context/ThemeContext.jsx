import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

// Create contexts
const ThemeContext = createContext();
const FontContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useFont = () => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState("system");
  const [fontSize, setFontSize] = useState("medium");
  const [isLoading, setIsLoading] = useState(true);

  // Determine current theme
  const currentTheme = themeMode === "system" ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;

  const theme = Colors[currentTheme];

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);


  // Get font size multiplier
  const getFontSizeMultiplier = () => {
    switch (fontSize) {
      case "small":
        return 0.875; // 14/16
      case "large":
        return 1.125; // 18/16
      default:
        return 1; // medium
    }
  };

  const fontSizeMultiplier = getFontSizeMultiplier();

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("themeMode");
      const savedFontSize = await AsyncStorage.getItem("fontSize");

      if (savedTheme) setThemeMode(savedTheme);
      if (savedFontSize) setFontSize(savedFontSize);
    } catch (error) {
      console.error("Error loading theme settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTheme = async (newTheme) => {
    try {
      setThemeMode(newTheme);
      await AsyncStorage.setItem("themeMode", newTheme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const updateFontSize = async (newSize) => {
    try {
      setFontSize(newSize);
      await AsyncStorage.setItem("fontSize", newSize);
    } catch (error) {
      console.error("Error saving font size:", error);
    }
  };

  const themeValue = {
    theme,
    themeMode,
    currentTheme,
    updateTheme,
    isLoading,
  };

  const fontValue = {
    fontSize,
    fontSizeMultiplier,
    updateFontSize,
  };

  if (isLoading) {
    return null; // Or a loading component
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <FontContext.Provider value={fontValue}>{children}</FontContext.Provider>
    </ThemeContext.Provider>
  );
};
