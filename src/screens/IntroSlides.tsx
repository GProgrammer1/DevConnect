import { Slide, slides } from "@/constants/Slides";
import { View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import LottieView from "lottie-react-native";
import { Button, Text as PaperText, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootNavigator";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type IntroNav = NativeStackNavigationProp<RootStackParamList, "IntroSlides">;
export default function IntroSlides() {
  const navigation = useNavigation<IntroNav>();

  const renderItem = ({ item }: { item: Slide }) => (
    <SlideComponent slideProps={item} />
  );

  const onDone = async () => {
    await AsyncStorage.setItem("has_seen_intro", "true");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView className="flex-1">
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        renderDoneButton={() => <Button mode="contained">Done</Button>}
        renderNextButton={() => <Button mode="contained">Next</Button>}
        renderSkipButton={() => <Button mode="contained">Skip</Button>}
        showSkipButton
        onDone={onDone}
        dotStyle={{
          backgroundColor: "rgba(255, 255, 255, 0.4)", // inactive dots
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 4,
        }}
        activeDotStyle={{
          backgroundColor: "#6c8cff", // brand primary color
          width: 12,
          height: 12,
          borderRadius: 6,
          marginHorizontal: 4,
        }}
      />
    </SafeAreaView>
  );
}

function SlideComponent({ slideProps }: { slideProps: Slide }) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-3">
      {slideProps.animation && (
        <LottieView
          source={slideProps.animation as any}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      )}
      <PaperText variant="headlineMedium" className="text-center">
        {slideProps.title}
      </PaperText>

      <PaperText variant="bodyLarge" className="text-center">
        {slideProps.text}
      </PaperText>
    </View>
  );
}
