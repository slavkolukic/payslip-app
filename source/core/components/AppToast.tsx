import { FC, memo, useMemo } from "react";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import Toast, { BaseToastProps, ToastConfig } from "react-native-toast-message";
import { useTheme } from "@/core/hooks";
import { Text } from "./Text";
import { AppToastType } from "@/core/types";

type AppToastProps = BaseToastProps & {
  variant: AppToastType;
  props?: {
    highlightText?: string;
    onPress?: () => void;
  };
};

export const AppToast = () => {
  return (
    <Toast
      config={appToastConfig}
      position={Platform.OS === "ios" ? "top" : "bottom"}
      bottomOffset={70}
      topOffset={70}
    />
  );
};

const AppToastLayout: FC<AppToastProps> = memo(
  ({ text1, variant, props }: AppToastProps) => {
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

    const highlightText = props?.highlightText;
    const handlePress = props?.onPress;

    const content = (
      <View
        style={[styles.container, { backgroundColor: theme.colors.bgLight }]}
      >
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
          {highlightText ? (
            <Text
              variant="caption"
              textColor="primary"
              numberOfLines={2}
              style={styles.highlight}
            >
              {highlightText}
            </Text>
          ) : null}
        </View>
      </View>
    );

    if (handlePress) {
      return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
          {content}
        </TouchableOpacity>
      );
    }

    return content;
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
  highlight: {
    marginTop: 4,
  },
});
