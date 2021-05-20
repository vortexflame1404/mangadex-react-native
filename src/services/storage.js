import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async ({ session, refresh }) => {
  try {
    await AsyncStorage.setItem('session', session);
    await AsyncStorage.setItem('refresh', refresh);
  } catch (e) {
    throw e;
  }
};

export const getSessionToken = async () => {
  return await AsyncStorage.getItem('session');
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refresh');
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('session');
    await AsyncStorage.removeItem('refresh');
  } catch (e) {
    throw e;
  }
};
