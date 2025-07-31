import { ThemeProvider, useFont, useTheme } from "@/context/ThemeContext";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, AppState, NativeModules, View } from "react-native";

import React from "react";

function AppLayout() {
  const { currentTheme } = useTheme();
  const { fontSize } = useFont();
  const [appState, setAppState] = React.useState("active");

  const toggleTheme = async () => {
    if (currentTheme == "dark") {
      await NativeModules.NativeTheme.setDarkTheme();
    } else {
      await NativeModules.NativeTheme.setLightTheme();
    }
  };

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      setAppState(state);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    toggleTheme();
  }, [currentTheme, appState, fontSize]);

  return (
    <>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
