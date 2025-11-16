import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Theme } from "@/core/types";
import { useStyles, useTheme } from "@/core/hooks";

export default function App() {
  const { isDark, setPreference } = useTheme();
  const styles = useStyles(createStyles);

  const toggleTheme = () => {
    setPreference(isDark ? "light" : "dark");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme: {isDark ? "Dark" : "Light"}</Text>
      <Text style={styles.subtitle}>
        Background and text reflect the active theme.
      </Text>
      <View style={styles.buttonSpacer} />
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          {isDark ? "Switch to Light" : "Switch to Dark"}
        </Text>
      </TouchableOpacity>
      <StatusBar style={isDark ? "light" : "dark"} />
    </View>
  );
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bg,
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      paddingHorizontal: 24,
    },
    title: {
      color: theme.colors.text,
      fontSize: 18,
      fontWeight: "600",
    },
    subtitle: {
      color: theme.colors.textMuted,
    },
    buttonSpacer: {
      height: 8,
    },
    button: {
      backgroundColor: theme.colors.secondary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
