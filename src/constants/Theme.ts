// constants/Theme.ts
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from "react-native-paper";
import { BRAND, colorsDark, colorsLight } from "./Colors";
import { interFonts } from "./Fonts";

/**
 * Paper themes that use your old style tokens.
 * ThemeBridge will pick these up and push CSS vars to NativeWind,
 * so your Tailwind usage remains unchanged.
 */

export const DevConnectDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  dark: true,
  isV3: true,
  roundness: 12,
  colors: colorsDark,
  fonts: interFonts,
  // safe custom block you can read elsewhere
  custom: {
    border: BRAND.borderDark,
    focusRing: BRAND.focusRingDark,
    gradient: { start: BRAND.gradStart, end: BRAND.gradEnd },
    surfaces: {
      toolbar: BRAND.surface1Dark, // optional
      card: BRAND.surface2Dark,    // optional
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
  isV3: true,
  roundness: 12,
  colors: colorsLight,
  fonts: interFonts,
  custom: {
    border: BRAND.borderLight,
    focusRing: BRAND.focusRingLight,
    gradient: { start: BRAND.gradStart, end: BRAND.gradEnd },
    surfaces: {
      toolbar: BRAND.surface2Light, // optional
      card: BRAND.surface1Light,    // optional
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
