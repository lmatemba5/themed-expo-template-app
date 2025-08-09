import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, AppState, NativeModules, StyleSheet, View } from "react-native";

function Content() {
  const { theme, currentTheme } = useTheme();

  const toggleTheme = async () => {
    if (currentTheme === "dark") {
      await NativeModules.NativeTheme.setDarkNavBar();
    } else {
      await NativeModules.NativeTheme.setLightNavBar();
    }
    await NavigationBar.setButtonStyleAsync(currentTheme == "dark" ? "light": "dark");
  };

  useEffect(() => {
    toggleTheme();

    const subscription = AppState.addEventListener("change", (state)=>{
      if(state === "active"){
        toggleTheme();
      }
    });

    return ()=>{
      subscription.remove();
    }
  }, [theme, currentTheme]);

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});