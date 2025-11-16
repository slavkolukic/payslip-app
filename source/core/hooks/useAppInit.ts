import { useLoadFonts } from "./useLoadFonts";

export const useAppInit = () => {
  const fontsLoaded = useLoadFonts();

  return fontsLoaded;
};
