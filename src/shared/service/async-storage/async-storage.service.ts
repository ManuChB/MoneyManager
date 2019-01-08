import { AsyncStorage } from 'react-native';
import _ from 'lodash';

class asyncStorageService {

    async getItem(key: string) {
        var value = null;
        try {
            value = await AsyncStorage.getItem(key);
        } catch (error) {
            console.log('[AsyncStorageService][getItem][error]>>>', error);
        }
        return value ? JSON.parse(value) : null;

    }

    async setItem(key: string, value: any) {
        if (key && value) {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.log('[AsyncStorageService][setItem][error]>>>', error);
            }
        }

    }

    async removeItem(key: string) {
        if (key) {
            await AsyncStorage.removeItem(key);
        }
    }
}

export default new asyncStorageService();