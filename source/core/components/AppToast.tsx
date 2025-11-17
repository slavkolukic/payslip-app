import { FC, memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Toast, { BaseToastProps, ToastConfig } from "react-native-toast-message";
import { useTheme } from "@/core/hooks";
import { Text } from "./Text";
import { AppToastType } from "@/core/types";

type AppToastProps = BaseToastProps & {
  variant: AppToastType;
};

export const AppToast = () => {
  return <Toast config={appToastConfig} position="bottom" bottomOffset={70} />;
};

const AppToastLayout: FC<AppToastProps> = memo(
  ({ text1, variant }: AppToastProps) => {
    const { theme } = useTheme();

    const accentColor = useMemo(() => {
      switch (variant) {
        case "success":
          return theme.colors.success;
        case "error":
          return theme.colors.danger;
        default:
          return theme.colors.info;
      }
    }, [variant, theme.colors]);

    return (
      <View style={[styles.container, { backgroundColor: theme.colors.bg }]}>
        <View style={[styles.accent, { backgroundColor: accentColor }]} />
        <View style={styles.textContainer}>
          <Text
            variant="body"
            textColor="text"
            numberOfLines={2}
            style={styles.text}
          >
            {text1}
          </Text>
        </View>
      </View>
    );
  }
);

const appToastConfig: ToastConfig = {
  default: (props) => <AppToastLayout {...props} variant="default" />,
  success: (props) => <AppToastLayout {...props} variant="success" />,
  error: (props) => <AppToastLayout {...props} variant="error" />,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: "70%",
    maxWidth: "94%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  accent: {
    width: 4,
    height: "100%",
    borderRadius: 999,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    marginTop: 1,
  },
});
