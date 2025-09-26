// src/screens/auth/SignupStepProfileControlled.tsx
import React from "react";
import { View } from "react-native";
import {
  Text as PaperText,
  TextInput as PaperTextInput,
  Chip,
  HelperText,
  useTheme as usePaperTheme,
} from "react-native-paper";
import type { SignupForm } from "@/types/schemas/auth/SignupSchema";

type StepProfileProps = {
  bio: string;
  setBio: (v: string) => void;
  interests: Set<string>;
  setInterests: React.Dispatch<React.SetStateAction<Set<string>>>;
  interestTemp: string;
  setInterestTemp: (v: string) => void;
  socialLinks: Set<string>;
  setSocialLinks: React.Dispatch<React.SetStateAction<Set<string>>>;
  linkTemp: string;
  setLinkTemp: (v: string) => void;
  errors: Partial<Record<keyof SignupForm, string>>;
};

export default function StepProfile(props: StepProfileProps) {
  const {
    bio,
    setBio,
    interests,
    setInterests,
    interestTemp,
    setInterestTemp,
    socialLinks,
    setSocialLinks,
    linkTemp,
    setLinkTemp,
    errors,
  } = props;

  const t = usePaperTheme();

  // ✅ Add / Remove Interests
  const addInterest = () => {
    const i = interestTemp.trim();
    if (!i) return;

    setInterests((prev) => {
      const newSet = new Set(prev);
      newSet.add(i);
      return newSet;
    });

    setInterestTemp("");
  };

  const removeInterest = (value: string) => {
    setInterests((prev) => {
      const newSet = new Set(prev);
      newSet.delete(value);
      return newSet;
    });
  };

  // ✅ Add / Remove Social Links
  const addLink = () => {
    let u = linkTemp.trim();
    if (!u) return;
    if (!/^https?:\/\//i.test(u)) u = `https://${u}`;

    setSocialLinks((prev) => {
      const newSet = new Set(prev);
      newSet.add(u);
      return newSet;
    });

    setLinkTemp("");
  };

  const removeLink = (value: string) => {
    setSocialLinks((prev) => {
      const newSet = new Set(prev);
      newSet.delete(value);
      return newSet;
    });
  };

  return (
    <View>
      {/* Bio */}
      <FieldLabel text="Bio (optional)" />
      <PaperTextInput
        mode="outlined"
        placeholder="Tell people what you build…"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        style={{ height: 96, textAlignVertical: "top" }}
        left={<PaperTextInput.Icon icon="note-text-outline" />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />

      {/* Interests */}
      <FieldLabel text="Interests" />
      <PaperTextInput
        mode="outlined"
        placeholder="e.g., Rust"
        value={interestTemp}
        onChangeText={setInterestTemp}
        left={<PaperTextInput.Icon icon="tag-plus-outline" />}
        right={<PaperTextInput.Icon icon="plus-circle-outline" onPress={addInterest} />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />
      {errors.interests && (
        <HelperText type="error" className="mt-[6]">
          {errors.interests}
        </HelperText>
      )}
      <View className="flex-row flex-wrap gap-[8] mt-[10]">
        {Array.from(interests).map((i) => (
          <Chip
            key={i}
            className="bg-primary"
            closeIcon="close-circle-outline"
            onClose={() => removeInterest(i)}
          >
            {i}
          </Chip>
        ))}
      </View>

      {/* Social Links */}
      <FieldLabel text="Social links" />
      <PaperTextInput
        mode="outlined"
        placeholder="https://github.com/you"
        autoCapitalize="none"
        value={linkTemp}
        onChangeText={setLinkTemp}
        left={<PaperTextInput.Icon icon="link-variant" />}
        right={<PaperTextInput.Icon icon="plus-circle-outline" onPress={addLink} />}
        outlineColor={t.colors.outline}
        activeOutlineColor={t.colors.primary}
        className="[background-color:rgb(var(--surface-variant)/1)] rounded-[12]"
      />
      {errors.socialLinks && (
        <HelperText type="error" className="mt-[6]">
          {errors.socialLinks}
        </HelperText>
      )}
      <View className="flex-row flex-wrap gap-[8] mt-[10]">
        {Array.from(socialLinks).map((l) => (
          <Chip
            key={l}
            className="bg-primary"
            closeIcon="close-circle-outline"
            onClose={() => removeLink(l)}
          >
            {l}
          </Chip>
        ))}
      </View>
    </View>
  );
}

function FieldLabel({ text }: { text: string }) {
  const t = usePaperTheme();
  return (
    <PaperText variant="labelLarge" className="text-onSurface mt-[10] mb_[6]">
      {text}
    </PaperText>
  );
}
