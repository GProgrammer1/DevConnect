import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Card,
  Text as PaperText,
  TextInput as PaperTextInput,
  Button,
  HelperText,
  ActivityIndicator,
  useTheme as usePaperTheme,
} from "react-native-paper";
import { RootStackParamList } from "@/navigation/RootNavigator";
import { loginSchema, LoginSchema } from "@/types/schemas/auth/LoginSchema";
import { AuthService } from "@/services/auth.service";
import { ApiClient } from "@/api/ApiClient";
import useAuth from "@/store/auth.store";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const t = usePaperTheme();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const disabled = useMemo(
    () => !email.trim() || pw.length < 8 || loading,
    [email, pw, loading]
  );
  const setAccessToken = useAuth((state) => state.setAccessToken);
  const setAuthEmail = useAuth((state) => state.setEmail);
  const setUserId = useAuth((state) => state.setUserId);
  const setAuthUsername = useAuth((state) => state.setUsername);
  const setRoles = useAuth((state) => state.setRoles);
  const setAuthName = useAuth((state) => state.setName);

  async function onLogin() {
    try {
      setLoading(true);
      setErr(null);
      const loginPayload: LoginSchema = {
        email,
        password: pw,
      };

      const result = loginSchema.parse(loginPayload);
      console.log("Result: ",result);
      
      const authService = new AuthService(ApiClient.getInstance());
      const res = await authService.login(result);
      console.log("Res data", res);
      
      const accessToken = res.data.payload?.accessToken;
      const user = res.data.payload?.user;
      const refreshToken = res.data.payload?.refreshToken;
      const expiresIn = res.data.payload?.expiresIn;
      //change global auth state
      setAccessToken(accessToken!);
      setAuthEmail(user!.email!);
      setAuthUsername(user!.username);
      setUserId(user?.user_id!);
      setRoles(user?.user_roles!);
      setAuthName(user?.name!);

      //save the refresh token
      await SecureStore.setItemAsync("refreshToken", refreshToken!);

      //save expiresIn
      await AsyncStorage.setItem("expiresIn", String(expiresIn!));
      navigation.replace("Signup");
    } catch (e: any) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const goSignup = () => navigation.navigate("Signup");
  //   const goForgot = () => navigation.navigate("ResetPassword", { token: "" });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-[20]">
          {/* Brand / Title */}
          <PaperText
            variant="displaySmall"
            className="text-onSurface text-center mb-[6]"
          >
            DevConnect
          </PaperText>
          <PaperText
            variant="bodyMedium"
            className="text-onSurface/70 text-center mb-[16]"
          >
            Welcome back — sign in to continue
          </PaperText>

          {/* Card */}
          <Card
            mode="elevated"
            className="w-full max-w-[420] bg-surface rounded-[16] border border-outline shadow-2xl"
          >
            <Card.Content className="px-[14] py-[14]">
              {/* Email */}
              <PaperText variant="labelLarge" className="text-onSurface mb-[6]">
                Email
              </PaperText>
              <PaperTextInput
                mode="outlined"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@domain.dev"
                value={email}
                onChangeText={setEmail}
                left={<PaperTextInput.Icon icon="email-outline" />}
                outlineColor={t.colors.outline}
                activeOutlineColor={t.colors.primary}
                className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
              />

              {/* Password */}
              <PaperText
                variant="labelLarge"
                className="text-onSurface mt-[10] mb-[6]"
              >
                Password
              </PaperText>
              <PaperTextInput
                mode="outlined"
                placeholder="••••••••"
                secureTextEntry={!showPw}
                value={pw}
                onChangeText={setPw}
                left={<PaperTextInput.Icon icon="lock-outline" />}
                right={
                  <PaperTextInput.Icon
                    icon={showPw ? "eye-off-outline" : "eye-outline"}
                    onPress={() => setShowPw((s) => !s)}
                  />
                }
                outlineColor={t.colors.outline}
                activeOutlineColor={t.colors.primary}
                className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
              />

              {/* Error */}
              {err ? (
                <HelperText type="error" className="mt-[6]">
                  {err}
                </HelperText>
              ) : null}

              {/* Login button */}
              <Button
                mode="contained"
                onPress={onLogin}
                disabled={disabled}
                className="h-[48] justify-center mt-[14] rounded-[12]"
              >
                {loading ? <ActivityIndicator color="#fff" /> : "Log in"}
              </Button>

              {/* Forgot */}
              <Button compact className="self-end mt-[10]">
                Forgot password?
              </Button>

              {/* Divider */}
              <View className="mt-[16] flex-row items-center justify-center gap-[8]">
                <View className="w-[40] h-[1] bg-outline" />
                <PaperText variant="bodySmall" className="text-onSurface/70">
                  or
                </PaperText>
                <View className="w-[40] h-[1] bg-outline" />
              </View>

              {/* Socials */}
              <View className="flex-row justify-center mt-[12] gap-[12]">
                <Button
                  mode="outlined"
                  icon="google"
                  onPress={() => {}}
                  className="flex-row items-center px-[14] h-[42] rounded-[12]"
                >
                  Google
                </Button>
                <Button
                  mode="outlined"
                  icon="github"
                  onPress={() => {}}
                  className="flex-row items-center px-[14] h-[42] rounded-[12]"
                >
                  GitHub
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Sign up CTA */}
          <View className="flex-row items-center mt-[14]">
            <PaperText variant="bodyMedium" className="text-onSurface/70">
              New here?
            </PaperText>
            <Button onPress={goSignup} compact className="ml-[6]" mode="text">
              Create an account
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
