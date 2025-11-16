import { getHeaderTitle, Header } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { FC, memo } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Icon } from "./Icon";
import { triggerHapticFeedback } from "../services";

type Props = NativeStackHeaderProps;

export const AppHeader: FC<Props> = memo(
  ({ options, route, back, navigation }) => {
    return (
      <Header
        {...options}
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

const styles = StyleSheet.create({
  headerRightContainer: {
    marginRight: 12,
  },
});
