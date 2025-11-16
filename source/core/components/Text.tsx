import { FC, useMemo } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import { useTheme } from "../hooks";

import { TextVariant, ThemeColor } from "../types";
import { typography } from "../styles";

type TextProps = RNTextProps & {
  variant?: TextVariant;
  textColor?: ThemeColor;
};

export const Text: FC<TextProps> = ({
  variant = "body",
  textColor,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const colorStyle: TextStyle = useMemo(() => {
    return {
      color: textColor ? theme.colors[textColor] : theme.colors.text,
    };
  }, [textColor, theme.colors]);

  return (
    <RNText {...props} style={[typography[variant], style, colorStyle]}>
      {props.children}
    </RNText>
  );
};
