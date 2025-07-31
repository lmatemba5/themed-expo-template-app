import { useFont, useTheme } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function TabLayout() {
  const { theme, currentTheme } = useTheme();
  const { fontSizeMultiplier } = useFont();

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          
          headerTintColor: theme.text,
          headerTitleStyle: {
            fontFamily: "Poppins_700Bold",
            fontSize: Math.round(18 * fontSizeMultiplier),
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 130,
            backgroundColor: theme.background
          },
          tabBarItemStyle: {
            minHeight: 130,
            paddingTop: 20,
          },
        }}
        
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View style={{
                  width: 70, 
                  backgroundColor: focused ? "lightgreen": undefined, 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", height: 35, borderRadius: 20}}>
                  <MaterialIcons size={25} name="home" color={focused ? "green": color} />
                </View>
                <Text style={{color: theme.text, marginTop: 6}}>Home</Text>
              </View>
            )
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <View style={{
                  width: 70, 
                  backgroundColor: focused ? "lightgreen": undefined, 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center", height: 35, borderRadius: 20}}>
                  <MaterialIcons size={25} name="settings" color={focused ? "green": color} />
                </View>
                <Text style={{color: theme.text, marginTop: 6}}>Settings</Text>
              </View>
            )
          }}
        />
      </Tabs>
      <StatusBar style={currentTheme === "dark" ? "light" : "dark"} />
    </>
  );
}
