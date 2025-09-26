import * as Linking from 'expo-linking';

const linking = {
    prefixes: [Linking.createURL("/reset"), "https://devconnect-expo.web.app"],
    config: {
        screens: {
            Reset: 'reset'
        }
    }
};

export default linking;