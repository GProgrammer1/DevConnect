import "react-native-gesture-handler";
import "./styles/nativewind-paper-wrapper";
import { View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import {
  adaptNavigationTheme,
  useTheme as usePaperTheme,
} from "react-native-paper";

import { PaperProvider } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { DevConnectDarkTheme, DevConnectLightTheme } from "./constants/Theme";
import { ThemeBridge } from "./theme/ThemeBridge";
import { StatusBarBlock } from "./components/StatusBarBlock";
import * as SystemUI from "expo-system-ui";
import {
  NavigationContainer,
  DefaultTheme as NavLight,
  DarkTheme as NavDark,
} from "@react-navigation/native";
import RootStackNavigator, {
  RootStackParamList,
} from "./navigation/RootNavigator";
import { interFonts } from "./constants/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
SplashScreen.preventAutoHideAsync();
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavLight,
  reactNavigationDark: NavDark,
  materialLight: DevConnectLightTheme,
  materialDark: DevConnectDarkTheme,
});
export default function App() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme ?? "dark");
  const [themeLoaded, setThemeLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      const themePref: "light" | "dark" = (await AsyncStorage.getItem(
        "theme"
      )) as "light" | "dark";
      if (themePref) {
        console.log("Theme pref: ", themePref);

        setTheme(themePref);
      } else {
        setTheme("dark");
        await AsyncStorage.setItem("theme", "light");
      }
      setThemeLoaded(true);
    })();
  }, []);
  const paperTheme =
    theme === "light" ? DevConnectLightTheme : DevConnectDarkTheme;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(paperTheme.colors.background);
  }, [paperTheme.colors.background]);
  if (!fontsLoaded || !themeLoaded) return null;

  return (
    <PaperProvider
      theme={theme === "light" ? DevConnectLightTheme : DevConnectDarkTheme}
    >
      <ThemeBridge>
        <NavigationContainer theme={paperTheme.dark ? DarkTheme : LightTheme}>
          <StatusBarBlock />

          <RootStackNavigator />
        </NavigationContainer>
      </ThemeBridge>
    </PaperProvider>
  );
}
