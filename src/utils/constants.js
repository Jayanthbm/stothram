// src/utils/constants.js

export const SCREEN_NAMES = Object.freeze({
  HOME: 'Home',
  LIST: 'List',
  READER: 'Reader',
  SETTINGS: 'Settings',
});

export const API_URL = 'https://stothram-api.jayanthbharadwajm.workers.dev/api';

export const DATA_URLS = Object.freeze({
  HOME: `${API_URL}/home-screen-data`,
  SETTINGS: `${API_URL}/setting-screen-data`,
});

export const CACHED_DATA_KEYS = Object.freeze({
  HOME: 'CACHED_HOME_SCREEN',
  SETTINGS: 'CACHED_SETTINGS_SCREEN',
  ENV: 'ENV',
  DEVMENU: 'DEV_MENU',
  CACHE_THRESHOLDS: 'CACHE_THRESHOLDS',
  API_URL: 'API_URL',
  API_URL_EDIT_MENU: 'API_URL_EDIT_MENU',
  DATA_URLS: 'DATA_URLS',
});
