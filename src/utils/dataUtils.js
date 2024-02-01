import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
// Constants for data thresholds
export const DATA_THRESHOLDS = {
  HOME: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
  LIST: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  READER: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
  SETTING: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
};

/**
 * Helper function to handle data fetching and caching.
 * @param {string} KEYNAME - The key under which data is stored.
 * @param {string} URL - The URL to fetch the data from.
 * @param {string} SCREEN_TYPE - The type of the screen.
 * @returns {object|null} - The fetched data or null on error.
 */
export const dataHelper = async (KEYNAME, URL, SCREEN_TYPE) => {
  try {
    const cachedData = await getJSON(KEYNAME);
    const lastFetchTime = await getItem(`${KEYNAME}_lastFetchTime`);

    if (cachedData) {
      console.log(`Fetching ${KEYNAME} data from cache`);
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

      return cachedData;
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

/**
 * Helper function to fetch and store data in AsyncStorage
 * @param {string} KEYNAME - The key under which data is stored.
 * @param {string} URL - The URL to fetch the data from.
 * @returns {object|null} - The fetched data or null on error.
 */
export const fetchAndStoreData = async (KEYNAME, URL) => {
  try {
    // Check if the device is connected to the internet
    const isConnected = await isInternetConnected();

    if (isConnected) {
      const response = await fetch(URL);
      const data = await response.json();

      // Update local storage with the new data and timestamp
      await storeJSON(KEYNAME, data);
      await storeItem(`${KEYNAME}_lastFetchTime`, new Date().getTime().toString());
      return data;
    } else {
      console.log('No internet connection. Data fetching skipped.');
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data from online (${KEYNAME}):`, error);
    return null;
  }
};

/**
 * Check if the device is connected to the internet.
 * @returns {boolean} - True if connected, false otherwise.
 */
export const isInternetConnected = async () => {
  try {
    const state = await NetInfo.fetch();
    // Check if the device is connected to the internet
    return state.isConnected;
  } catch (error) {
    console.error("Error checking internet connection:", error);
    return false; // Handle the error appropriately based on your application's needs
  }
};

/**
 * Helper function to compare the time difference between the current time and the last fetch time.
 * @param {number} currentTime - The current time in milliseconds.
 * @param {string} lastFetchTime - The timestamp of the last fetch.
 * @param {number} threshold - The threshold for time difference in milliseconds.
 * @returns {boolean} - True if the time difference is greater than the threshold, false otherwise.
 */
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

/**
 * Prefetch data for multiple data objects asynchronously.
 * @param {Array} dataArray - Array of data objects.
 * @param {string} SCREEN_TYPE - The type of the screen.
 * @returns {boolean} - True if prefetching is successful, false otherwise.
 */
export const preFetcher = async (dataArray, SCREEN_TYPE) => {
  try {
    const fetchPromises = dataArray.map(dataObject =>
      dataObject.dataUrl
        ? dataHelper(dataObject.title, dataObject.dataUrl, SCREEN_TYPE)
        : Promise.resolve(null),
    );

    await Promise.all(fetchPromises);
    return true;
  } catch (error) {
    console.error('Error in preFetcher:', error);
    return false;
  }
};

/**
 * Store a key-value pair in AsyncStorage.
 * @param {string} key - The key to store.
 * @param {string} value - The value to store.
 */
export const storeItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieve the value associated with the given key from AsyncStorage.
 * @param {string} key - The key to retrieve.
 * @returns {string|null} - The retrieved value or null on error.
 */
export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log(error);
    return null;
  }
};


/**
 * Store a key-value pair as JSON in AsyncStorage.
 * @param {string} key - The key to store.
 * @param {object} value - The value to store as JSON.
 */
export const storeJSON = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieve the JSON value associated with the given key from AsyncStorage.
 * @param {string} key - The key to retrieve.
 * @returns {object|null} - The retrieved JSON value or null on error.
 */
export const getJSON = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
    return null;
  }
};
