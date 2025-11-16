import { useThemeStore } from "../store";
import { useLoadFonts } from "./useLoadFonts";

export const useAppInit = () => {
  const fontsLoaded = useLoadFonts();
  const hasThemeStoreHydrated = useThemeStore((store) => store._hasHydrated);

  return fontsLoaded && hasThemeStoreHydrated;
};
