import { FC, useMemo } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { useTheme } from "../hooks";
import { RALEWAY } from "../constants/fonts";

type TextVariant = keyof typeof styles;

type TextProps = RNTextProps & {
  variant?: TextVariant;
  textColor?: string;
};

export const Text: FC<TextProps> = ({
  variant = "body",
  textColor,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const color = useMemo(
    () => (textColor ? textColor : theme.colors.text),
    [textColor, theme.colors.text]
  );

  return (
    <RNText {...props} style={[styles[variant], style, { color }]}>
      {props.children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: RALEWAY.BOLD,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.15,
  },
  subtitle: {
    fontFamily: RALEWAY.SEMI_BOLD,
    fontSize: 16,
    lineHeight: 22,
  },
  body: {
    fontFamily: RALEWAY.REGULAR,
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontFamily: RALEWAY.MEDIUM,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  button: {
    fontFamily: RALEWAY.SEMI_BOLD,
    fontSize: 16,
    lineHeight: 20,
  },
});
