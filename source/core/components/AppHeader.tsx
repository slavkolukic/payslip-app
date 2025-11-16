import { getHeaderTitle, Header } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Icon } from "./Icon";
import { triggerHapticFeedback } from "../services";
import { RALEWAY } from "../constants";
import { useStyles } from "../hooks";
import { Theme } from "../types";

type Props = NativeStackHeaderProps;

export const AppHeader: FC<Props> = memo(
  ({ options, route, back, navigation }) => {
    const styles = useStyles(createStyles);
    return (
      <Header
        {...options}
        headerTitleStyle={styles.headerTitle}
        headerBackTitleStyle={styles.headerBackTitle}
        headerStyle={styles.headerContainer}
        headerRight={() => {
          if (route.name !== "Payslips") return null;
          const handlePress = () => {
            triggerHapticFeedback("medium");
            navigation.navigate("Settings");
          };

          return (
            <Pressable
              hitSlop={10}
              style={styles.headerRightContainer}
              onPress={handlePress}
              accessibilityRole="button"
              accessibilityLabel="Open settings"
              accessibilityHint="Navigates to the settings screen"
            >
              <Icon iconName="settings" size={24} color={"text"} />
            </Pressable>
          );
        }}
        back={back}
        title={getHeaderTitle(options, route.name)}
      />
    );
  }
);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    headerContainer: {
      backgroundColor: theme.colors.bg,
    },
    headerTitle: {
      fontFamily: RALEWAY.SEMI_BOLD,
      fontSize: 18,
      color: theme.colors.text,
    },
    headerBackTitle: {
      fontFamily: RALEWAY.SEMI_BOLD,
      fontSize: 16,
    },
    headerRightContainer: {
      marginRight: 12,
    },
  });
