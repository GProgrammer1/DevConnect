// StatusBarBlock.tsx
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, View } from "react-native";
import { useTheme } from "react-native-paper";

export function StatusBarBlock() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const barStyle = theme.dark ? "light" : "dark";

  // Expo StatusBar: auto chooses light/dark based on color scheme
  // You can force it if you prefer: style={t.dark ? "light" : "dark"}
  return (
    <>
      <StatusBar
        style={barStyle}
        hidden={false}
        // Only affects Android
        backgroundColor={theme.colors.surfaceVariant ?? theme.colors.background}
      />
      {/* On iOS, fake a background under the notch/clock */}
      {Platform.OS === "ios" && insets.top > 0 && (
        <View
          style={{
            height: insets.top,
            backgroundColor: theme.colors.surfaceVariant ?? theme.colors.background,
          }}
        />
      )}
    </>
  );
}
