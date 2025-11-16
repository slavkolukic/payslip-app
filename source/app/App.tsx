import { StatusBar } from "expo-status-bar";
import { useAppInit, useTheme } from "@/core/hooks";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { RootStackNavigator } from "./navigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const { isDark } = useTheme();

  const appInitialized = useAppInit();

  if (!appInitialized) {
    // ideally splash screen should be hidden here
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
      <StatusBar style={isDark ? "light" : "dark"} />
    </SafeAreaProvider>
  );
}
