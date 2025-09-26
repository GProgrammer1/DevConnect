/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.tsx",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // 🎨 Colors
      colors: {
        background: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surfaceVariant: "rgb(var(--surface-variant) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        onSurface: "rgb(var(--on-surface) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",

        // custom brand tokens
        border: "rgba(148,163,184,0.18)",
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#ef4444",
      },

      fontFamily: {
        inter: ["Inter_400Regular", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "sans-serif"],
        "inter-semibold": ["Inter_600SemiBold", "sans-serif"],
        "inter-bold": ["Inter_700Bold", "sans-serif"],
      },

      fontSize: {
        displayLarge: ["57px", { lineHeight: "64px", fontWeight: "700" }],
        displayMedium: ["45px", { lineHeight: "52px", fontWeight: "700" }],
        displaySmall: ["36px", { lineHeight: "44px", fontWeight: "600" }],

        headlineLarge: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        headlineMedium: ["28px", { lineHeight: "36px", fontWeight: "600" }],
        headlineSmall: ["24px", { lineHeight: "32px", fontWeight: "600" }],

        titleLarge: ["22px", { lineHeight: "28px", fontWeight: "600" }],
        titleMedium: ["16px", { lineHeight: "24px", fontWeight: "600" }],
        titleSmall: ["14px", { lineHeight: "20px", fontWeight: "500" }],

        labelLarge: ["14px", { lineHeight: "20px", fontWeight: "600" }],
        labelMedium: ["12px", { lineHeight: "16px", fontWeight: "500" }],
        labelSmall: ["11px", { lineHeight: "16px", fontWeight: "500" }],

        bodyLarge: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        bodyMedium: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        bodySmall: ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
