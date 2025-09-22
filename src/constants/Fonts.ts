// fonts.ts
import { MD3LightTheme, configureFonts } from "react-native-paper";
import type { MD3Typescale } from "react-native-paper/lib/typescript/types";

// Start from Paper's MD3 sizes/metrics
const base = MD3LightTheme.fonts;

// Small helper to swap family
const ff = (t: typeof base.displayLarge, family: string) => ({
  ...t,
  fontFamily: family,
});

// Build a complete MD3 typescale + the required `default`
export const interScale: MD3Typescale = {
  // REQUIRED by your RNP types:
  default: {
    // no fontSize / lineHeight here!
    fontFamily: "Inter_400Regular",
    fontWeight: base.bodyMedium.fontWeight,
    letterSpacing: base.bodyMedium.letterSpacing,
    fontStyle: base.bodyMedium.fontStyle,
  },

  displayLarge:   ff(base.displayLarge,   "Inter_700Bold"),
  displayMedium:  ff(base.displayMedium,  "Inter_700Bold"),
  displaySmall:   ff(base.displaySmall,   "Inter_600SemiBold"),

  headlineLarge:  ff(base.headlineLarge,  "Inter_700Bold"),
  headlineMedium: ff(base.headlineMedium, "Inter_600SemiBold"),
  headlineSmall:  ff(base.headlineSmall,  "Inter_600SemiBold"),

  titleLarge:     ff(base.titleLarge,     "Inter_600SemiBold"),
  titleMedium:    ff(base.titleMedium,    "Inter_600SemiBold"),
  titleSmall:     ff(base.titleSmall,     "Inter_500Medium"),

  labelLarge:     ff(base.labelLarge,     "Inter_600SemiBold"),
  labelMedium:    ff(base.labelMedium,    "Inter_500Medium"),
  labelSmall:     ff(base.labelSmall,     "Inter_500Medium"),

  bodyLarge:      ff(base.bodyLarge,      "Inter_400Regular"),
  bodyMedium:     ff(base.bodyMedium,     "Inter_400Regular"),
  bodySmall:      ff(base.bodySmall,      "Inter_400Regular"),
};

// Give this to Paper:
export const interFonts = configureFonts({ config: interScale });
