import { configureFonts, MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";
import { BRAND, colorsDark, colorsLight } from "./Colors";
import { interFonts } from "./Fonts";

export const DevConnectDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  dark: true,
  roundness: 16,
  isV3: true,
  colors: colorsDark,
  fonts: interFonts,
  // custom (safe to add—Paper ignores unknown keys but you can read them)
  custom: {
    border: BRAND.border,
    focusRing: BRAND.focusRing,
    gradient: BRAND.gradient,
    surfaces: {
      toolbar: BRAND.surfaceToolbarDark,
      card: BRAND.surfaceCardDark,
    },
    semantic: {
      success: BRAND.success,
      warning: BRAND.warning,
      danger: BRAND.danger,
    },
  },
} as MD3Theme & {
  custom: {
    border: string;
    focusRing: string;
    gradient: { start: string; end: string };
    surfaces: { toolbar: string; card: string };
    semantic: { success: string; warning: string; danger: string };
  };
};

export const DevConnectLightTheme: MD3Theme = {
  ...MD3LightTheme,
  dark: false,
  roundness: 16,
  isV3: true,
  colors: colorsLight,
  fonts: interFonts,
  custom: {
    border: "rgba(15,22,35,0.15)",
    focusRing: BRAND.focusRing,
    gradient: BRAND.gradient,
    surfaces: {
      toolbar: "#f1f5f9",
      card: "#ffffff",
    },
    semantic: {
      success: BRAND.success,
      warning: BRAND.warning,
      danger: BRAND.danger,
    },
  },
} as MD3Theme & {
  custom: {
    border: string;
    focusRing: string;
    gradient: { start: string; end: string };
    surfaces: { toolbar: string; card: string };
    semantic: { success: string; warning: string; danger: string };
  };
};
