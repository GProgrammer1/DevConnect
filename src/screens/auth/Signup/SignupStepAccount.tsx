// src/screens/auth/SignupStepAccountControlled.tsx
import React, { useState } from "react";
import { View } from "react-native";
import { Text as PaperText, TextInput as PaperTextInput, HelperText, Checkbox, useTheme as usePaperTheme } from "react-native-paper";
import type { SignupForm } from "@/types/schemas/auth/SignupSchema";

type StepAccountProps = {
  username: string;
  setUsername: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  errors: Partial<Record<keyof SignupForm, string>>;
  showPasswordToggle?: boolean;
};

export default function StepAccount(props: StepAccountProps) {
  const {
    username, setUsername,
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    errors,
    showPasswordToggle,
  } = props;

  const t = usePaperTheme();
  const [showPw, setShowPw] = useState(false);

  return (
    <View>
      <FieldLabel text="Username" />
      <PaperTextInput
        mode="outlined"
        placeholder="dev_champ"
        value={username}
        onChangeText={setUsername}
        left={<PaperTextInput.Icon icon="at" />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />
      {errors.username && <HelperText type="error" className="mt-[6]">{errors.username}</HelperText>}

      <FieldLabel text="Name" />
      <PaperTextInput
        mode="outlined"
        placeholder="Ada Lovelace"
        value={name}
        onChangeText={setName}
        left={<PaperTextInput.Icon icon="account-outline" />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />
      {errors.name && <HelperText type="error" className="mt-[6]">{errors.name}</HelperText>}

      <FieldLabel text="Email" />
      <PaperTextInput
        mode="outlined"
        placeholder="you@domain.dev"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        left={<PaperTextInput.Icon icon="email-outline" />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />
      {errors.email && <HelperText type="error" className="mt-[6]">{errors.email}</HelperText>}

      <FieldLabel text="Password" />
      <PaperTextInput
        mode="outlined"
        placeholder="••••••••"
        secureTextEntry={!showPw}
        value={password}
        onChangeText={setPassword}
        left={<PaperTextInput.Icon icon="lock-outline" />}
        right={<PaperTextInput.Icon icon={showPw ? "eye-off-outline" : "eye-outline"} onPress={() => setShowPw((s) => !s)} />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />
      {errors.password && <HelperText type="error" className="mt-[6]">{errors.password}</HelperText>}

      <FieldLabel text="Confirm password" />
      <PaperTextInput
        mode="outlined"
        placeholder="••••••••"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        left={<PaperTextInput.Icon icon="check-circle-outline" />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />
      {errors.confirmPassword && <HelperText type="error" className="mt-[6]">{errors.confirmPassword}</HelperText>}
    </View>
  );
}

function FieldLabel({ text }: { text: string }) {
  const t = usePaperTheme();
  return (
    <PaperText variant="labelLarge" className="text-onSurface mt-[10] mb-[6]">
      {text}
    </PaperText>
  );
}
