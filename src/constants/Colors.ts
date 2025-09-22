import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

export const BRAND = {
  primary: "#6c8cff",
  secondary: "#8b5cf6",
  tertiary: "#22d3ee",
  bgDark: "#0b0f14",
  surfaceCardDark: "#101825",
  surfaceToolbarDark: "#0f1623",
  textOnDark: "#e5e7eb",
  border: "rgba(148,163,184,0.18)",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  focusRing: "rgba(139,92,246,0.55)", // custom (not MD spec)
  gradient: { start: "#22d3ee", end: "#8b5cf6" }, // custom
};

export const colorsDark: MD3Colors = {
  ...MD3DarkTheme.colors,
  // Required / common
  primary: BRAND.primary,
  secondary: BRAND.secondary,
  tertiary: BRAND.tertiary,

  background: BRAND.bgDark,
  surface: BRAND.surfaceCardDark,
  surfaceVariant: BRAND.surfaceToolbarDark,

  error: BRAND.danger,
  outline: BRAND.border,
  outlineVariant: BRAND.border,

  onSurface: BRAND.textOnDark,
  onSurfaceVariant: BRAND.textOnDark,
  onPrimary: "#ffffff",
  onSecondary: "#ffffff",
  onTertiary: "#0b0f14",
  onError: "#ffffff",

  // MD3 extras (kept sensible)
  inverseSurface: "#e5e7eb",
  inverseOnSurface: "#0b0f14",
  inversePrimary: "#b9c8ff",
  surfaceDisabled: "rgba(229,231,235,0.18)",
  onSurfaceDisabled: "rgba(229,231,235,0.38)",
  shadow: "#000000",
  scrim: "#000000",
  backdrop: "rgba(0,0,0,0.4)",

  // Elevation (MD3 expects a nested object)
  elevation: {
    level0: "transparent",
    level1: "#0f1420",
    level2: "#111723",
    level3: "#121a27",
    level4: "#131c2a",
    level5: "#151f2e",
  },
};

// -----------------------------
// 4) MD3 Colors (Light)
// - Keeps brand colors, adapts neutrals for light UI
// -----------------------------
export const colorsLight: MD3Colors = {
  ...MD3LightTheme.colors,
  primary: BRAND.primary,
  secondary: BRAND.secondary,
  tertiary: BRAND.tertiary,

  background: "#f8fafc",
  surface: "#ffffff",
  surfaceVariant: "#f1f5f9",

  error: BRAND.danger,
  outline: "rgba(15,22,35,0.15)",
  outlineVariant: "rgba(15,22,35,0.12)",

  onSurface: "#0b0f14",
  onSurfaceVariant: "#101825",
  onPrimary: "#0b0f14",
  onSecondary: "#ffffff",
  onTertiary: "#0b0f14",
  onError: "#ffffff",

  inverseSurface: "#0b0f14",
  inverseOnSurface: "#e5e7eb",
  inversePrimary: "#3957d9",
  surfaceDisabled: "rgba(15,22,35,0.12)",
  onSurfaceDisabled: "rgba(15,22,35,0.38)",
  shadow: "#000000",
  scrim: "#000000",
  backdrop: "rgba(0,0,0,0.3)",

  elevation: {
    level0: "transparent",
    level1: "rgba(0,0,0,0.02)",
    level2: "rgba(0,0,0,0.04)",
    level3: "rgba(0,0,0,0.06)",
    level4: "rgba(0,0,0,0.08)",
    level5: "rgba(0,0,0,0.10)",
  },
};