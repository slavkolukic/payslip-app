import { FC, memo, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { useStyles } from "../hooks/useStyles";
import { Text } from "./Text";
import { IconName, Theme, ThemeColor } from "../types";
import { useTheme } from "../hooks";
import { Icon } from "./Icon";
import { ACTIVE_OPACITY } from "../constants";
import { HapticFeedbackType, triggerHapticFeedback } from "../services";

type ButtonVariant = "default" | "outlined" | "primary";

type ButtonProps = Omit<TouchableOpacityProps, "children" | "activeOpacity"> & {
  label: string;
  variant?: ButtonVariant;
  loading?: boolean;
  iconName?: IconName;
  activeOpacity?: keyof typeof ACTIVE_OPACITY;
  hapticFeedbackType?: HapticFeedbackType;
};

export const Button: FC<ButtonProps> = memo(
  ({
    label,
    variant = "default",
    disabled,
    style,
    loading = false,
    iconName,
    activeOpacity = "default",
    hapticFeedbackType,
    onPress,
    ...otherProps
  }) => {
    const styles = useStyles(createButtonStyles);
    const { theme } = useTheme();

    const handlePress = useCallback(
      (event: NativeSyntheticEvent<NativeTouchEvent>) => {
        if (hapticFeedbackType) {
          triggerHapticFeedback(hapticFeedbackType);
        }
        onPress?.(event);
      },
      [hapticFeedbackType, onPress]
    );

    const containerVariantStyle = useMemo(
      () =>
        variant === "primary"
          ? styles.primary
          : variant === "outlined"
          ? styles.outlined
          : styles.default,
      [variant, styles]
    );

    const labelColor: ThemeColor = useMemo(() => {
      switch (variant) {
        case "primary":
          return "primary";
        case "outlined":
          return "text";
        default:
          return "text";
      }
    }, [variant]);

    return (
      <TouchableOpacity
        {...otherProps}
        activeOpacity={ACTIVE_OPACITY[activeOpacity]}
        onPress={handlePress}
        style={[
          styles.base,
          containerVariantStyle,
          disabled && styles.disabled,
          style,
        ]}
      >
        <View style={[styles.content, loading && styles.contentHidden]}>
          {iconName ? (
            <Icon
              iconName={iconName}
              size={24}
              color={labelColor}
              style={styles.icon}
            />
          ) : null}
          <Text numberOfLines={1} variant="button" textColor={labelColor}>
            {label}
          </Text>
          <Icon iconName="build" size={24} style={styles.dummyIcon} />
        </View>
        {loading ? (
          <ActivityIndicator style={styles.loading} color={theme.colors.text} />
        ) : null}
      </TouchableOpacity>
    );
  }
);

const createButtonStyles = (theme: Theme) =>
  StyleSheet.create({
    base: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    default: {
      backgroundColor: theme.colors.bg,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
    },
    outlined: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    primary: {
      backgroundColor: theme.colors.secondary,
    },
    disabled: {
      opacity: 0.6,
    },
    loading: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    contentHidden: {
      opacity: 0,
    },
    icon: {
      marginRight: 8,
    },
    dummyIcon: {
      opacity: 0,
      width: 0,
    },
  });
