import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { Theme } from "@/core/types";
import { useAppInit, useStyles, useTheme } from "@/core/hooks";
import { Button, Text } from "@/core/components";

export default function App() {
  const { isDark, setPreference } = useTheme();
  const styles = useStyles(createStyles);
  const appInitialized = useAppInit();

  const toggleTheme = () => {
    setPreference(isDark ? "light" : "dark");
  };

  if (!appInitialized) {
    // ideally splash screen should be hidden here
    return null;
  }

  return (
    <View style={styles.container}>
      <Text variant="title">Theme: {isDark ? "Dark" : "Light"}</Text>
      <Text variant="body" textColor="textMuted">
        Background and text reflect the active theme.
      </Text>
      <View style={styles.buttonSpacer} />
      <Button
        label={isDark ? "Switch to Light" : "Switch to Dark"}
        iconName={isDark ? "sunny" : "moon"}
        onPress={toggleTheme}
        variant="primary"
      />
      <StatusBar style={isDark ? "light" : "dark"} />
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bgDark,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      paddingHorizontal: 24,
    },
    buttonSpacer: {
      height: 8,
    },
  });
