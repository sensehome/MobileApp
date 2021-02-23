import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  Bearer: 'bearer',
};

const StoreService = {
  getBearerToken: async (): Promise<string> => {
    let token = await AsyncStorage.getItem(KEYS.Bearer)
    if(!token){
      throw new Error("Token not found")
    }
    return token!!
  },

  setBearerToken: async (token: string): Promise<void> => {
    await AsyncStorage.setItem(KEYS.Bearer, token)
  },

  remoteBearerToken: async (): Promise<void> => {
    await AsyncStorage.removeItem(KEYS.Bearer);
  },
};

export default StoreService;
