import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { useThemeStore } from "../store";
import { darkTheme, lightTheme } from "../themes";

export const useTheme = () => {
  const systemScheme = useColorScheme();
  const preference = useThemeStore((store) => store.preference);
  const setPreference = useThemeStore((store) => store.setPreference);

  const effectiveScheme = useMemo(
    () => (preference === "system" ? systemScheme : preference),
    [preference, systemScheme]
  );

  const isDark = useMemo(() => effectiveScheme === "dark", [effectiveScheme]);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return { theme, preference, setPreference, isDark };
};
