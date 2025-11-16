import { Theme } from "../types";

export const lightTheme: Theme = {
  isDark: false,
  colors: {
    bgDark: "hsl(0, 0%, 90%)",
    bg: "hsl(0, 0%, 95%)",
    bgLight: "hsl(0, 0%, 100%)",
    bgContrast: "hsl(0, 0%, 5%)",
    border: "hsl(0, 0%, 60%)",
    text: "hsl(0, 0%, 5%)",
    textMuted: "hsl(0, 0%, 30%)",
    textContrast: "hsl(0, 0%, 95%)",
    primary: "hsl(71, 72%, 50%)",
    secondary: "hsl(73, 50%, 20%)",
    danger: "hsl(352, 75%, 55%)",
    warning: "hsl(28, 85%, 55%)",
    success: "hsl(156, 55%, 45%)",
    info: "hsl(198, 80%, 52%)",
  },
};
