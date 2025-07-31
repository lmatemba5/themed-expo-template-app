import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito-sans";
import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";

import { useFont, useTheme } from "@/context/ThemeContext";

export default function App() {
  const { theme, currentTheme } = useTheme();
  const { fontSizeMultiplier } = useFont();

  const [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });

  const styles = createStyles(
    theme,
    currentTheme,
    fontsLoaded,
    fontSizeMultiplier
  );

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={theme.tint} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      <View style={styles.centeredContainer}>
        <Text style={{ color: theme.text, fontFamily: fontsLoaded ? "NunitoSans_400Bold" : undefined, fontSize: Math.round(16 * fontSizeMultiplier) }}>
          Home
        </Text>
      </View>
    </View>
  );
}

const createStyles = (theme, currentTheme, fontsLoaded, fontSizeMultiplier) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme === "dark" ? "#000000" : "#F5F5F7",
    },
    centeredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background || "#FFFFFF",
      padding: 20,
    },
    textColor: {
      color: currentTheme === "dark" ? "#FFFFFF" : "#000000",
      fontSize: Math.round(16 * fontSizeMultiplier),
      fontFamily: fontsLoaded ? "NunitoSans_400Regular" : undefined,
    },
    loadingText: {
      marginTop: 10,
      fontSize: Math.round(16 * fontSizeMultiplier),
      color: theme.text,
      fontFamily: fontsLoaded ? "NunitoSans_400Regular" : undefined,
    },
  });
