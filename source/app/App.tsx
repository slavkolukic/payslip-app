import { StatusBar } from "expo-status-bar";
import { useAppInit, useTheme } from "@/core/hooks";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { RootStackNavigator } from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import { ReducedMotionConfig, ReduceMotion } from "react-native-reanimated";
import { AppToast } from "@/core/components";

export default function App() {
  const { isDark } = useTheme();

  const appInitialized = useAppInit();

  const { theme } = useTheme();

  if (!appInitialized) {
    // ideally splash screen should be shown here
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{ backgroundColor: theme.colors.bgDark }}
    >
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
      {/* This is used to reduce motion for accessibility purposes */}
      <ReducedMotionConfig mode={ReduceMotion.System} />
      <AppToast />
      <StatusBar style={isDark ? "light" : "dark"} />
    </SafeAreaProvider>
  );
}
