import "react-native-gesture-handler";
import { View,useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";
import { Button, PaperProvider, Text } from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { useEffect } from "react";
import { AsyncStorageService } from "./services/AsyncStorageService";
import { DevConnectDarkTheme, DevConnectLightTheme } from "./constants/Theme";
SplashScreen.preventAutoHideAsync();

export default function App() {
  let theme = useColorScheme() as string;
  let themeLoaded = false;
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
      const themePref = await AsyncStorageService.get("theme");
      if (themePref) theme = themePref;
      themeLoaded = true;
    })();
  });

  if (!fontsLoaded) return;

  return (
    <PaperProvider
      theme={theme === "light" ? DevConnectLightTheme : DevConnectDarkTheme}
    >
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text>Hello World!</Text>
          <Button mode="contained">Hi</Button>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
