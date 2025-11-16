/**
 * Theme would ideally also contain typography, spacing etc. but I've decided
 * to keep it with just colors for the demonstration purposes.
 */
export type Theme = {
  isDark: boolean;
  colors: {
    bgDark: string;
    bg: string;
    bgLight: string;
    bgContrast: string;
    border: string;
    text: string;
    textMuted: string;
    textContrast: string;
    primary: string;
    secondary: string;
    danger: string;
    warning: string;
    success: string;
    info: string;
  };
};

export type ThemeColor = keyof Theme["colors"];
