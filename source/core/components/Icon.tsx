import Ionicons from "@expo/vector-icons/Ionicons";
import { IconName, ThemeColors } from "../types";
import { StyleProp, ViewStyle } from "react-native";
import { FC, useMemo } from "react";
import { useTheme } from "../hooks";

type Props = {
  iconName: IconName;
  size?: number;
  color?: ThemeColors;
  style?: StyleProp<ViewStyle>;
};

export const Icon: FC<Props> = ({ iconName, size = 24, color, style }) => {
  const { theme } = useTheme();

  const effectiveColor = useMemo(() => {
    return color ? theme.colors[color] : theme.colors.text;
  }, [color, theme.colors]);

  return (
    <Ionicons
      name={iconName}
      size={size}
      color={effectiveColor}
      style={style}
    />
  );
};
