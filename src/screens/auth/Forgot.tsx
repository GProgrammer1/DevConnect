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
  Icon,
  Snackbar,
} from "react-native-paper";
import { RootStackParamList } from "@/navigation/RootNavigator";
import { ApiClient } from "@/api/ApiClient";
import { AuthService } from "@/services/auth.service";
import { forgotSchema } from "@/types/schemas/auth/ForgotSchema";

type Props = NativeStackScreenProps<RootStackParamList, "Forgot">;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const t = usePaperTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const disabled = useMemo(() => !email.trim() || loading, [email, loading]);

  async function onForgot() {
    try {
      setLoading(true);
      setErr(null);
      setSuccessMsg(null);
      const result = forgotSchema.parse({ email });

      const authService = new AuthService(ApiClient.getInstance());
      const res = await authService.forgotPassword(result);

      console.log("Api res: ", res);

      // assuming API returns a generic ok message
      setSuccessMsg(
        res.data.message || "Password reset link sent to your email."
      );
      setShowSnackbar(true); // show snackbar
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

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
            Reset your password
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

              <View className="mt-[6] flex-row items-start p-[10] rounded-[12] bg-primary/10 border border-primary/30">
                <Icon source="information-outline" size={20} color="primary"/>
                <HelperText type="info" className="text-primary m-0 flex-1">
                  Enter your account email. If it’s registered, you’ll receive a
                  reset link.
                </HelperText>
              </View>

              {/* Error */}
              {err ? (
                <HelperText type="error" className="mt-[6]">
                  {err}
                </HelperText>
              ) : null}
              

              {/* Submit button */}
              <Button
                mode="contained"
                onPress={onForgot}
                disabled={disabled}
                className="h-[48] justify-center mt-[14] rounded-[12]"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  "Send reset link"
                )}
              </Button>

              {/* Back to login */}
              <Button
                compact
                className="self-end mt-[10]"
                onPress={() => navigation.goBack()}
              >
                Back to login
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={4000}
        action={{
          label: "OK",
          onPress: () => setShowSnackbar(false),
        }}
        style={{ backgroundColor: t.colors.primary }}
      >
        {successMsg}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}
