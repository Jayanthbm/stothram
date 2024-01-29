import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItemFromStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? value : null;
  } catch (error) {
    console.error(`Error getting item from AsyncStorage (${key}):`, error);
    return null;
  }
};

export const setItemInStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item in AsyncStorage (${key}):`, error);
  }
};

export const compareTimeDifference = (
  currentTime,
  lastFetchTime,
  threshold,
) => {
  const timeDifference = lastFetchTime
    ? currentTime - parseInt(lastFetchTime)
    : threshold;

  return timeDifference > threshold;
};
