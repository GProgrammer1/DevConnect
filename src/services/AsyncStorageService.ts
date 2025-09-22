import AsyncStorage from '@react-native-async-storage/async-storage'
export class AsyncStorageService {
    constructor() { }

    static async get(k: string) {
        try {
            const v = await AsyncStorage.getItem(k);
            return v ?? null;
        } catch (err: any) {
            console.error(`Error getting value for key ${k} in async storage:`, err.message);
        }
    }

    static async set(k: string, v: any) {
        try {
            const stringified = JSON.stringify(v);
            await AsyncStorage.setItem(k, stringified);
        } catch (err: any) {
            console.error(`Error setting value ${v} for key ${k} in async storage:`, err.message);
        }
    }
}