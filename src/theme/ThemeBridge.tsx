import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { vars } from "nativewind";

type Props = { children: React.ReactNode; style?: StyleProp<ViewStyle> };

/** Pushes RNP theme colors into CSS variables used by NativeWind */
export function ThemeBridge({ children, style }: Props) {
  const t = useTheme();

  const styleVars = vars({
    "--bg": hexToRgb(t.colors.background),
    "--surface": hexToRgb(t.colors.surface),
    "--surface-variant": hexToRgb(t.colors.surfaceVariant ?? t.colors.surface),
    "--primary": hexToRgb(t.colors.primary),
    "--secondary": hexToRgb(t.colors.secondary ?? t.colors.primary),
    "--tertiary": hexToRgb(t.colors.tertiary ?? t.colors.primary),
    "--outline": hexToRgb(t.colors.outline ?? "#94a3b8"),
    "--on-surface": hexToRgb(t.colors.onSurface ?? "#000000"),
    "--error": hexToRgb(t.colors.error ?? "#ef4444"),
  });

  return (
    <View style={[styleVars, style]} className="flex-1">
      {children}
    </View>
  );
}

/** Convert #rrggbb or rgba(...) to "r g b" string for rgb(var(--x)) */
function hexToRgb(input: string) {
  if (input.startsWith("rgb")) {
    // already rgb/rgba -> extract numbers
    const m = input.match(/(\d+),\s*(\d+),\s*(\d+)/);
    return m ? `${m[1]} ${m[2]} ${m[3]}` : "0 0 0";
    }
  // #rrggbb -> r g b
  const hex = input.replace("#", "");
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
}
