import { RootStackParamList, Theme, ThemePreference } from "@/core/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Icon } from "@/core/components";
import { useStyles } from "@/core/hooks";
import { useTheme } from "@/core/hooks";
import { ACTIVE_OPACITY } from "@/core/constants";
import { triggerHapticFeedback } from "@/core/services";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const themeOptions = [
  { key: "system" as const, label: "Use system theme" },
  { key: "light" as const, label: "Light" },
  { key: "dark" as const, label: "Dark" },
];

export const SettingsScreen: FC<Props> = () => {
  const styles = useStyles(createStyles);
  const { preference, setPreference } = useTheme();

  const handleThemePress = (key: ThemePreference) => {
    triggerHapticFeedback("light");
    setPreference(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text variant="title" style={styles.sectionTitle}>
          Theme
        </Text>
        <View style={styles.card}>
          {themeOptions.map((option, index) => {
            const selected = preference === option.key;
            return (
              <View key={option.key}>
                <TouchableOpacity
                  activeOpacity={ACTIVE_OPACITY.default}
                  style={styles.row}
                  onPress={() => handleThemePress(option.key)}
                  accessibilityRole="button"
                  accessibilityLabel={`Set theme to ${option.label}`}
                >
                  <Text variant="body">{option.label}</Text>
                  <Icon
                    iconName={selected ? "checkmark-circle" : "ellipse-outline"}
                    color={selected ? "primary" : ("textMuted" as any)}
                    size={22}
                  />
                </TouchableOpacity>
                {index < themeOptions.length - 1 ? (
                  <View style={styles.separator} />
                ) : null}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.bgDark,
      paddingHorizontal: 16,
      paddingTop: 12,
    },
    section: {
      marginTop: 8,
    },
    sectionTitle: {
      marginBottom: 8,
    },
    card: {
      backgroundColor: theme.colors.bg,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOpacity: theme.isDark ? 0.25 : 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 14,
      paddingVertical: 14,
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: theme.colors.border,
      marginLeft: 14,
      marginRight: 14,
      opacity: 0.6,
    },
  });
