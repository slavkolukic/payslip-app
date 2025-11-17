import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  FadeIn,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { ThemeColor } from "../types";
import { useTheme } from "../hooks";
import { FC, memo, useEffect, useMemo } from "react";

type Props = {
  color?: ThemeColor;
  containerStyle?: ViewStyle;
};

export const LoadingIndicator: FC<Props> = memo(
  ({ color = "text", containerStyle }) => {
    const { theme } = useTheme();

    const offset = useSharedValue(0);

    useEffect(() => {
      offset.value = withRepeat(withTiming(3, { duration: 750 }), -1, true);
    }, [offset]);

    const firstLine = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scaleY: interpolate(offset.value, [0, 1, 2, 3], [1, 0.3, 0.2, 0.2]),
          },
        ],
      };
    });

    const secondLine = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scaleY: interpolate(offset.value, [0, 1, 2, 3], [0.3, 1, 0.3, 0.2]),
          },
        ],
      };
    });

    const thirdLine = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scaleY: interpolate(offset.value, [0, 1, 2, 3], [0.2, 0.3, 1, 0.3]),
          },
        ],
      };
    });

    const fourthLine = useAnimatedStyle(() => {
      return {
        transform: [
          {
            scaleY: interpolate(offset.value, [0, 1, 2, 3], [0.2, 0.2, 0.3, 1]),
          },
        ],
      };
    });

    const effectiveColorStyle: ViewStyle = useMemo(() => {
      return {
        backgroundColor: color ? theme.colors[color] : theme.colors.text,
      };
    }, [color, theme.colors]);

    return (
      <Animated.View style={containerStyle} entering={FadeIn}>
        <View style={styles.linesContainer}>
          <Animated.View
            style={[styles.lineBase, firstLine, effectiveColorStyle]}
          />
          <View style={styles.spacing} />
          <Animated.View
            style={[styles.lineBase, secondLine, effectiveColorStyle]}
          />
          <View style={styles.spacing} />
          <Animated.View
            style={[styles.lineBase, thirdLine, effectiveColorStyle]}
          />
          <View style={styles.spacing} />
          <Animated.View
            style={[styles.lineBase, fourthLine, effectiveColorStyle]}
          />
        </View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  linesContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  lineBase: {
    width: 6,
    height: 24,
    borderRadius: 50,
  },
  spacing: {
    width: 3,
  },
});
