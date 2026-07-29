import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { API_URL, CACHED_DATA_KEYS } from './constants';
// Default constants for data thresholds
export const DEFAULT_DATA_THRESHOLDS = {
  HOME: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
  LIST: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  READER: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
  SETTING: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
};

export const DATA_THRESHOLDS = { ...DEFAULT_DATA_THRESHOLDS };

/**
 * Initialize cache thresholds in AsyncStorage if not present
 */
export const initCacheThresholds = async () => {
  try {
    const existing = await getJSON(CACHED_DATA_KEYS.CACHE_THRESHOLDS);
    if (!existing) {
      await storeJSON(
        CACHED_DATA_KEYS.CACHE_THRESHOLDS,
        DEFAULT_DATA_THRESHOLDS,
      );
    }
  } catch (error) {
    console.error('Error initializing cache thresholds:', error);
  }
};

/**
 * Get dynamic cache thresholds from AsyncStorage
 */
export const getCacheThresholds = async () => {
  try {
    const custom = await getJSON(CACHED_DATA_KEYS.CACHE_THRESHOLDS);
    return { ...DEFAULT_DATA_THRESHOLDS, ...(custom || {}) };
  } catch (error) {
    console.error('Error fetching cache thresholds:', error);
    return DEFAULT_DATA_THRESHOLDS;
  }
};

/**
 * Save custom cache thresholds to AsyncStorage
 */
export const saveCacheThresholds = async thresholds => {
  try {
    await storeJSON(CACHED_DATA_KEYS.CACHE_THRESHOLDS, thresholds);
  } catch (error) {
    console.error('Error saving cache thresholds:', error);
  }
};

/**
 * Initialize API_URL and DATA_URLS in AsyncStorage if not present
 */
export const initApiUrlToStorage = async () => {
  try {
    const existingApiUrl = await getItem(CACHED_DATA_KEYS.API_URL);
    if (!existingApiUrl) {
      await storeItem(CACHED_DATA_KEYS.API_URL, API_URL);
      await storeJSON(CACHED_DATA_KEYS.DATA_URLS, DATA_URLS);
    }
  } catch (error) {
    console.error('Error initializing API URL:', error);
  }
};

/**
 * Get current API_URL from AsyncStorage
 */
export const getApiUrl = async () => {
  try {
    const stored = await getItem(CACHED_DATA_KEYS.API_URL);
    return stored || API_URL;
  } catch (error) {
    console.error('Error getting API URL:', error);
    return API_URL;
  }
};

/**
 * Get dynamic DATA_URLS from AsyncStorage
 */
export const getDynamicDataUrls = async () => {
  try {
    const stored = await getJSON(CACHED_DATA_KEYS.DATA_URLS);
    return stored || DATA_URLS;
  } catch (error) {
    console.error('Error getting dynamic DATA_URLS:', error);
    return DATA_URLS;
  }
};

/**
 * Update API_URL in AsyncStorage and recalculate DATA_URLS
 */
export const updateApiUrl = async newApiUrl => {
  try {
    const baseUrl = newApiUrl.trim().replace(/\/+$/, '');
    await storeItem(CACHED_DATA_KEYS.API_URL, baseUrl);
    const updatedDataUrls = {
      HOME: `${baseUrl}/home-screen-data`,
      SETTINGS: `${baseUrl}/setting-screen-data`,
    };
    await storeJSON(CACHED_DATA_KEYS.DATA_URLS, updatedDataUrls);
    return updatedDataUrls;
  } catch (error) {
    console.error('Error updating API URL:', error);
    return DATA_URLS;
  }
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
    SCREEN_TYPE = SCREEN_TYPE.toUpperCase();
    const thresholds = await getCacheThresholds();
    const threshold = thresholds[SCREEN_TYPE] ?? DEFAULT_DATA_THRESHOLDS[SCREEN_TYPE];

    // If threshold is 0 (No Cache), bypass reading from cache and directly fetch online
    if (threshold === 0) {
      console.log(`No cache set for ${SCREEN_TYPE}. Fetching online directly.`);
      const freshData = await fetchAndStoreData(KEYNAME, URL);
      if (freshData) {
        return freshData;
      }
    }

    const cachedData = await getJSON(KEYNAME);
    const lastFetchTime = await getItem(`${KEYNAME}_lastFetchTime`);

    if (cachedData) {
      // Check if it's time to fetch from online
      const currentTime = new Date().getTime();
      const shouldFetchFromOnline = compareTimeDifference(
        currentTime,
        lastFetchTime,
        threshold,
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

    const env = (await getItem(CACHED_DATA_KEYS.ENV)) || 'prod';
    const baseUrl = await getApiUrl();
    let newURL;
    if (URL.includes('https://') || URL.includes('http://')) {
      newURL = `${URL}?env=${env}`;
    } else {
      const cleanUrl = URL.startsWith('/') ? URL : `/${URL}`;
      newURL = `${baseUrl}${cleanUrl}?env=${env}`;
    }
    if (isConnected) {
      const response = await fetch(newURL);
      const data = await response.json();

      // Update local storage with the new data and timestamp
      await storeJSON(KEYNAME, data);
      await storeItem(
        `${KEYNAME}_lastFetchTime`,
        new Date().getTime().toString(),
      );
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
    console.error('Error checking internet connection:', error);
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
