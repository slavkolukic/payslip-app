import Ionicons from "@expo/vector-icons/Ionicons";
import { IconName, ThemeColor } from "../types";
import { StyleProp, ViewStyle } from "react-native";
import { FC, memo, useMemo } from "react";
import { useTheme } from "../hooks";

type Props = {
  iconName: IconName;
  size?: number;
  color?: ThemeColor;
  style?: StyleProp<ViewStyle>;
};

export const Icon: FC<Props> = memo(({ iconName, size = 24, color, style }) => {
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
});
