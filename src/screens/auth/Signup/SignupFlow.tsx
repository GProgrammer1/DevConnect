// src/screens/auth/SignupFlowControlled.tsx
import React, { useState, useMemo } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import {
  Card,
  Text as PaperText,
  Button,
  useTheme as usePaperTheme,
  ActivityIndicator,
} from "react-native-paper";
import {
  signupSchema,
  type SignupForm,
} from "@/types/schemas/auth/SignupSchema";
import StepAccount from "./SignupStepAccount";
import StepProfile from "./SignupStepProfile";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import z from "zod";
import { ApiClient } from "@/api/ApiClient";
import { AuthService } from "@/services/auth.service";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import useAuth from "@/store/auth.store";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import mapErrToSnackbar from "@/utils/mapErrorToSnackbar";

export type SignupFlowProps = {
  onSubmit?: (data: SignupForm) => void;
};

type SignupNav = NativeStackNavigationProp<RootStackParamList, "Signup">;

export default function SignupFlowControlled() {
  const t = usePaperTheme(); // <-- add

  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);

  // Full form state
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [socialLinks, setSocialLinks] = useState<Set<string>>(new Set());

  // temp inputs
  const [interestTemp, setInterestTemp] = useState("");
  const [linkTemp, setLinkTemp] = useState("");

  // field validation errors
  const [errors, setErrors] = useState<Partial<Record<keyof SignupForm, string>>>({});

  // http error -> snackbar
  const [httpErr, setHttpErr] = useState<AxiosError | null>(null); // <-- add
  const [showErr, setShowErr] = useState(false); // <-- add

  const navigation = useNavigation<SignupNav>();
  const setAccessToken = useAuth((state) => state.setAccessToken);
  const setAuthEmail = useAuth((state) => state.setEmail);
  const setUserId = useAuth((state) => state.setUserId);
  const setAuthUsername = useAuth((state) => state.setUsername);
  const setRoles = useAuth((state) => state.setRoles);
  const setAuthName = useAuth((state) => state.setName);

  const onNext = () => {
    const step1Schema = signupSchema.pick({
      username: true,
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    try {
      const payload: Partial<SignupForm> = {
        username,
        password,
        name,
        confirmPassword,
        email,
      };

      step1Schema.parse(payload); // throws if invalid
      setErrors({});
      setStep(2);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = err.issues.reduce(
          (acc, issue) => {
            const field = issue.path[0] as keyof SignupForm;
            if (field) acc[field] = issue.message;
            return acc;
          },
          {} as Partial<Record<keyof SignupForm, string>>
        );
        setErrors(newErrors);
      } else {
        // if something else went wrong, surface a snackbar
        setHttpErr(err as any);
        setShowErr(true);
      }
    }
  };

  const onCreate = async () => {
    setSubmitting(true);
    setHttpErr(null);        // <-- add
    setShowErr(false);       // <-- add
    try {
      // validate all
      const payload: SignupForm = {
        username,
        password,
        name: name,
        interests: Array.from(interests),
        bio,
        confirmPassword,
        email,
        socialLinks: Array.from(socialLinks),
      };

      signupSchema.parse(payload);
      setErrors({});

      const authService = new AuthService(ApiClient.getInstance());
      const res = await authService.signup({ ...payload });

      const accessToken = res.data.payload?.accessToken!;
      const user = res.data.payload?.user!;
      const refreshToken = res.data.payload?.refreshToken!;
      const expiresIn = res.data.payload?.expiresIn!;

      // change global auth state
      setAccessToken(accessToken);
      setAuthEmail(user.email!);
      setAuthUsername(user.username);
      setUserId(user.user_id!);
      setRoles(user.user_roles!);
      setAuthName(user.name!);

      // persist tokens
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      await AsyncStorage.setItem("expiresIn", String(expiresIn));

      // TODO: when home tabs exist, navigate there instead
      navigation.navigate("Login");
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const newErrors = err.issues.reduce(
          (acc, issue) => {
            const field = issue.path[0] as keyof SignupForm;
            if (field) acc[field] = issue.message;
            return acc;
          },
          {} as Partial<Record<keyof SignupForm, string>>
        );
        setErrors(newErrors);
      } else {
        // axios or unknown -> snackbar
        setHttpErr(err);
        setShowErr(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const s1Valid = useMemo(() => {
    return (
      username.trim() !== "" &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.length >= 8 &&
      password === confirmPassword
    );
  }, [username, name, email, password, confirmPassword]);

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        className="flex-1 grow-1"
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === "android" ? 80 : 0}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-[20] py-[24]">
          <PaperText variant="headlineSmall" className="text-onSurface text-center mb-[6]">
            Create your account
          </PaperText>
          <PaperText variant="bodyMedium" className="text-onSurface/70 text-center mb-[16]">
            Join DevConnect in two quick steps
          </PaperText>

          <View className="flex-row items-center gap-[10] mb-[12]">
            <StepDot active={step === 1} label="Account" />
            <View className="w-[48] h-[1] bg-outline" />
            <StepDot active={step === 2} label="Profile" />
          </View>

          <Card
            mode="elevated"
            className="w-full max-w-[520] bg-surface rounded-[16] border border-outline shadow-2xl"
          >
            <Card.Content className="px-[16] py-[16]">
              {step === 1 ? (
                <StepAccount
                  username={username}
                  setUsername={setUsername}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  errors={errors}
                  showPasswordToggle
                />
              ) : (
                <StepProfile
                  bio={bio}
                  setBio={setBio}
                  interests={interests}
                  setInterests={setInterests}
                  interestTemp={interestTemp}
                  setInterestTemp={setInterestTemp}
                  socialLinks={socialLinks}
                  setSocialLinks={setSocialLinks}
                  linkTemp={linkTemp}
                  setLinkTemp={setLinkTemp}
                  errors={errors}
                />
              )}

              <View className="flex-row gap-[10] mt-[16]">
                {step === 2 && (
                  <Button
                    mode="outlined"
                    onPress={() => setStep(1)}
                    className="rounded-[12] px-[16] h-[48] justify-center"
                    icon="chevron-left"
                  >
                    Back
                  </Button>
                )}

                {step === 1 ? (
                  <Button
                    mode="contained"
                    disabled={!s1Valid}
                    onPress={onNext}
                    className="rounded-[12] px_[16] h-[48] justify-center flex-1"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    onPress={onCreate}
                    className="rounded-[12] px-[16] h-[48] justify-center flex-1"
                  >
                    {!submitting ? "Create account" : <ActivityIndicator />}
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>

          <View className="flex-row items-center mt-[14]">
            <PaperText variant="bodyMedium" className="text-onSurface/70">
              Already have an account?
            </PaperText>
            <Button
              compact
              className="ml-[2]"
              mode="text"
              onPress={() => navigation.navigate("Login")}
            >
              Sign In
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* Axios -> Snackbar */}
      {mapErrToSnackbar(t, httpErr, showErr, () => setShowErr(false))}
    </SafeAreaView>
  );
}

function StepDot({ active, label }: { active: boolean; label: string }) {
  return (
    <View className="items-center">
      <View
        className={`w-[14] h-[14] rounded-[7] ${active ? "bg-primary" : "bg-outline"}`}
      />
      <PaperText variant="bodySmall" className="text-onSurface mt-[6]">
        {label}
      </PaperText>
    </View>
  );
}
