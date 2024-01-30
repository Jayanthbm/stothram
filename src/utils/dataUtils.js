import AsyncStorage from '@react-native-async-storage/async-storage';

export const DATA_THRESHOLDS = {
  HOME: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  LIST: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  READER: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
  SETTING: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
};

export const dataHelper = async (KEYNAME, URL, SCREEN_TYPE) => {
  try {
    const cachedData = await AsyncStorage.getItem(KEYNAME);
    const lastFetchTime = await AsyncStorage.getItem(
      `${KEYNAME}_lastFetchTime`,
    );

    if (cachedData) {
      console.log(`Fetching ${SCREEN_TYPE} data from cache`);
      const data = JSON.parse(cachedData);

      // Check if it's time to fetch from online
      const currentTime = new Date().getTime();
      const shouldFetchFromOnline = compareTimeDifference(
        currentTime,
        lastFetchTime,
        DATA_THRESHOLDS[SCREEN_TYPE],
      );
      if (!lastFetchTime || shouldFetchFromOnline) {
        fetchAndStoreData(KEYNAME, URL);
      }

      return data;
    } else {
      // If no cached version, fetch from online
      console.log(`Fetching ${SCREEN_TYPE} data from online`);
      const data = await fetchAndStoreData(KEYNAME, URL);
      return data;
    }
  } catch (error) {
    console.error(`Error fetching ${SCREEN_TYPE} data:`, error);
    return null;
  }
};

export const fetchAndStoreData = async (KEYNAME, URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    // Update local storage with the new data and timestamp
    await AsyncStorage.setItem(KEYNAME, JSON.stringify(data?.data));
    await AsyncStorage.setItem(
      `${KEYNAME}_lastFetchTime`,
      new Date().getTime().toString(),
    );

    return data.data;
  } catch (error) {
    console.error(`Error fetching data from online (${KEYNAME}):`, error);
    return null;
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
