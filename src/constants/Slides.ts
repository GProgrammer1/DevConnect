import { ImageSourcePropType } from "react-native";
import { AnimationObject } from "react-native-reanimated";

export const slides: Slide[] = [
    {
        key: 'one',
        title: 'Find your community',
        text: 'Join communities with specific interests that match yours. Share opinions',
        animation: require('../assets/lottie/Community.json'),
    },
    {
        key: 'two',
        title: 'Ask for help',
        text: 'Get insights and advice from tech enthusiasts and nerds',
        animation: require('../assets/lottie/Support.json')
    },
    {
        key: 'three',
        title: 'Befriend and share insights',
        text:' Follow people with your interests and chat with them',
        animation: require('../assets/lottie/Chat Animation.json')
    },
    {
        key: 'four',
        title: 'Create your community',
        text: 'Create a community of your interest with your rules and spread insights',
        animation: require("../assets/lottie/Share.json")
    }
]

export interface Slide {
    key: string;
    title: string;
    text: string;
    animation?: AnimationObject;
    image?: ImageSourcePropType;
}