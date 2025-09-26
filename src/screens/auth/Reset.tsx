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
import { z } from "zod";
import { AxiosError } from "axios";
import mapErrToSnackbar from "@/utils/mapErrorToSnackbar";

const resetSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
        "Min 8 chars, upper, lower, number, symbol"
      ),
    confirmPassword: z.string(),
    token: z.string().min(1, "Invalid or missing token"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Props = NativeStackScreenProps<RootStackParamList, "Reset">;

export default function ResetPasswordScreen({ navigation, route }: Props) {
  const t = usePaperTheme();

  const token = route?.params?.token ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldErrs, setFieldErrs] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // error snackbar state
  const [httpErr, setHttpErr] = useState<AxiosError | null>(null);
  const [showErr, setShowErr] = useState(false);

  // success snackbar state
  const [showSuccess, setShowSuccess] = useState(false);

  const disabled = useMemo(
    () => !password || !confirmPassword || loading,
    [password, confirmPassword, loading]
  );

  async function onReset() {
    try {
      setLoading(true);
      setHttpErr(null);
      setShowErr(false);
      setFieldErrs({});
      setSuccessMsg(null);
      setShowSuccess(false);

      const parsed = resetSchema.parse({ password, confirmPassword, token });

      const authService = new AuthService(ApiClient.getInstance());
      const res = await authService.resetPassword({
        token: "abc",
        newPassword: parsed.password,
      });

      setSuccessMsg(
        res?.data?.message ||
          "Your password has been updated. You can log in now."
      );
      setShowSuccess(true);
    } catch (e: any) {
      if (e?.issues?.length) {
        // Zod field errors
        const next: any = {};
        e.issues.forEach((i: any) => {
          if (i.path?.[0]) next[i.path[0]] = i.message;
        });
        setFieldErrs(next);
      } else {
        // Axios/unknown
        setHttpErr(e);
        setShowErr(true);
      }
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
            Create a new password
          </PaperText>

          <Card
            mode="elevated"
            className="w-full max-w-[420] bg-surface rounded-[16] border border-outline shadow-2xl"
          >
            <Card.Content className="px-[14] py-[14]">
              {/* Password */}
              <PaperText variant="labelLarge" className="text-onSurface mb-[6]">
                New password
              </PaperText>
              <PaperTextInput
                mode="outlined"
                secureTextEntry={!showPass}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                left={<PaperTextInput.Icon icon="lock-outline" />}
                right={
                  <PaperTextInput.Icon
                    icon={showPass ? "eye-off-outline" : "eye-outline"}
                    onPress={() => setShowPass((s) => !s)}
                  />
                }
                outlineColor={t.colors.outline}
                activeOutlineColor={t.colors.primary}
                className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
                error={!!fieldErrs.password}
              />
              {fieldErrs.password ? (
                <HelperText type="error" className="mt-[2]">
                  {fieldErrs.password}
                </HelperText>
              ) : null}

              {/* Confirm Password */}
              <View className="mt-[10]">
                <PaperText
                  variant="labelLarge"
                  className="text-onSurface mb-[6]"
                >
                  Confirm password
                </PaperText>
                <PaperTextInput
                  mode="outlined"
                  secureTextEntry={!showConfirm}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  left={<PaperTextInput.Icon icon="lock-check-outline" />}
                  right={
                    <PaperTextInput.Icon
                      icon={showConfirm ? "eye-off-outline" : "eye-outline"}
                      onPress={() => setShowConfirm((s) => !s)}
                    />
                  }
                  outlineColor={t.colors.outline}
                  activeOutlineColor={t.colors.primary}
                  className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
                  error={!!fieldErrs.confirmPassword}
                />
                {fieldErrs.confirmPassword ? (
                  <HelperText type="error" className="mt-[2]">
                    {fieldErrs.confirmPassword}
                  </HelperText>
                ) : null}
              </View>

              {/* Info box */}
              <View className="mt-[8] flex-row items-start p-[10] rounded-[12] bg-primary/10 border border-primary/30">
                <Icon source="information-outline" size={20} color="primary" />
                <HelperText type="info" className="text-primary m-0 flex-1">
                  Use at least 8 characters with upper & lower case letters, a
                  number, and a symbol.
                </HelperText>
              </View>

              {/* Submit */}
              <Button
                mode="contained"
                onPress={onReset}
                disabled={disabled}
                className="h-[48] justify-center mt-[14] rounded-[12]"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  "Update password"
                )}
              </Button>

              {/* Back to login */}
              <Button
                compact
                className="self-end mt-[10]"
                onPress={() => navigation.navigate("Login")}
              >
                Back to login
              </Button>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Success Snackbar */}
      {successMsg && (
        <Snackbar
          visible={showSuccess}
          onDismiss={() => setShowSuccess(false)}
          duration={4000}
          action={{
            label: "OK",
            onPress: () => setShowSuccess(false),
          }}
          style={{ backgroundColor: t.colors.primary }}
        >
          {successMsg}
        </Snackbar>
      )}

      {/* Error Snackbar */}
      {mapErrToSnackbar(t, httpErr, showErr, () => setShowErr(false), [
        {
          label: "Forgot password",
          onPress: () => {
            setShowErr(false);
            navigation.navigate("Forgot");
          },
          condition: (msg) => /expired token|invalid token/i.test(msg),
        },
        {
          label: "OK",
          onPress: () => setShowErr(false),
        },
      ])}
    </KeyboardAvoidingView>
  );
}
