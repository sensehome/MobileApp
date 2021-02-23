import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  Bearer: 'bearer',
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IiIsInJvbGUiOiIxIiwibmJmIjoxNjEzODkwOTY0LCJleHAiOjE2MTQ0OTU3NjQsImlhdCI6MTYxMzg5MDk2NH0.B8Fv52EWRtzrowenrr5A47yKHAfEbKkjCeDcQf7dd9Q';

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
