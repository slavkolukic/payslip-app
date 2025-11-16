import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";

const HAPTIC_FEEDBACK_MAP = {
  light: ImpactFeedbackStyle.Light,
  medium: ImpactFeedbackStyle.Medium,
  heavy: ImpactFeedbackStyle.Heavy,
  soft: ImpactFeedbackStyle.Soft,
  rigid: ImpactFeedbackStyle.Rigid,
} as const;

export type HapticFeedbackType = keyof typeof HAPTIC_FEEDBACK_MAP;

export const triggerHapticFeedback = (
  hapticFeedbackType: HapticFeedbackType
) => {
  impactAsync(HAPTIC_FEEDBACK_MAP[hapticFeedbackType]);
};
