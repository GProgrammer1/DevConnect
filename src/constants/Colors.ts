// constants/Colors.ts
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

/**
 * Old-style tokens mapped into MD3 color slots.
 * - background   -> background
 * - surface1     -> surface
 * - surface2     -> surfaceVariant
 * - text         -> onSurface
 * - border       -> outline / outlineVariant
 * - primary      -> primary
 * - secondary    -> secondary
 * - accent       -> tertiary
 * - danger       -> error
 * - overlay      -> backdrop
 */

export const BRAND = {
  // pulled from your old DARK/LIGHT tokens
  primary:    "#6c8cff",
  secondary:  "#8b5cf6",
  accent:     "#22d3ee",

  // dark surfaces/text
  bgDark:           "#0b0f14",
  surface1Dark:     "#0f1623",
  surface2Dark:     "#101825",
  textOnDark:       "#e5e7eb",

  // light surfaces/text
  bgLight:          "#f8fafc",
  surface1Light:    "#ffffff",
  surface2Light:    "#f1f5f9",
  textOnLight:      "#0f172a",
  textOnLightAlt:   "#101825",

  borderDark:  "rgba(148,163,184,0.18)",
  borderLight: "rgba(2,6,23,0.12)",

  success: "#10b981",
  warning: "#f59e0b",
  danger:  "#ef4444",

  focusRingDark:  "rgba(139,92,246,0.55)",
  focusRingLight: "rgba(139,92,246,0.35)",

  gradStart: "#22d3ee",
  gradEnd:   "#8b5cf6",
};

export const colorsDark: MD3Colors = {
  ...MD3DarkTheme.colors,

  primary:  BRAND.primary,
  secondary: BRAND.secondary,
  tertiary: BRAND.accent,

  background: BRAND.bgDark,
  surface: BRAND.surface1Dark,          // <- surface1
  surfaceVariant: BRAND.surface2Dark,   // <- surface2

  error: BRAND.danger,
  outline: BRAND.borderDark,
  outlineVariant: BRAND.borderDark,

  // on-* (readable on dark)
  onSurface: BRAND.textOnDark,
  onSurfaceVariant: BRAND.textOnDark,
  onPrimary: "#ffffff",
  onSecondary: "#ffffff",
  onTertiary: BRAND.bgDark,
  onError: "#ffffff",

  inverseSurface: "#e5e7eb",
  inverseOnSurface: "#0b0f14",
  inversePrimary: "#b9c8ff",

  surfaceDisabled: "rgba(229,231,235,0.18)",
  onSurfaceDisabled: "rgba(229,231,235,0.38)",
  shadow: "#000000",
  scrim: "#000000",
  backdrop: "rgba(0,0,0,0.4)",

  elevation: {
    level0: "transparent",
    level1: "#0f1420",
    level2: "#111723",
    level3: "#121a27",
    level4: "#131c2a",
    level5: "#151f2e",
  },
};

export const colorsLight: MD3Colors = {
  ...MD3LightTheme.colors,

  primary:  BRAND.primary,
  secondary: BRAND.secondary,
  tertiary: BRAND.accent,

  background: BRAND.bgLight,
  surface: BRAND.surface1Light,         // <- surface1
  surfaceVariant: BRAND.surface2Light,  // <- surface2

  error: BRAND.danger,
  outline: BRAND.borderLight,
  outlineVariant: "rgba(15,22,35,0.12)",

  // on-* (readable on light)
  onSurface: BRAND.textOnLight,
  onSurfaceVariant: BRAND.textOnLightAlt,
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
  backdrop: "rgba(0,0,0,0.08)",

  elevation: {
    level0: "transparent",
    level1: "rgba(0,0,0,0.02)",
    level2: "rgba(0,0,0,0.04)",
    level3: "rgba(0,0,0,0.06)",
    level4: "rgba(0,0,0,0.08)",
    level5: "rgba(0,0,0,0.10)",
  },
};
