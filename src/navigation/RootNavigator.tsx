import Login from "@/screens/auth/Login";
import Signup from "@/screens/auth/Signup/SignupFlow";
import IntroSlides from "@/screens/IntroSlides";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

export type RootStackParamList = {
  IntroSlides: undefined;
  Login: undefined;
  Signup: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>("IntroSlides");
  const [initialRouteResolved, setInitialRouteResolved] = useState(false);
  const t = useTheme();
  // useEffect(() => {
  //   (async () => {
  //     const hasSeenIntro = await AsyncStorageService.get("has_seen_intro");
  //     if (hasSeenIntro) setInitialRoute("Signup");
  //     setInitialRouteResolved(true);
  //   })();
  // }, []);

  // if (!initialRouteResolved) return <ActivityIndicator />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // This prevents any white between screens during transitions
        contentStyle: { backgroundColor: t.colors.background },
        headerStyle: { backgroundColor: t.colors.surface },
        headerTintColor: t.colors.onSurface,
      }}
      initialRouteName={initialRoute}
    >
      <Stack.Screen name="IntroSlides" component={IntroSlides} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
