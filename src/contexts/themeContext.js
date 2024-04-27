import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Appearance, Platform, ToastAndroid } from 'react-native';

// AsyncStorage keys
const DARK_MODE_KEY = '@darkmode';
const DARK_MODE_TOGGLE_KEY = '@darkmodetoggle';
const FONT_SIZE_KEY = '@fontSize';

// Theme context creation
export const ThemeContext = React.createContext({
  darkmode: false,
  toggleDarkMode: () => {},
  darkSwitch: false,
  toggleDarkSwitch: () => {},
  viewType: 'card',
  toggleViewType: () => {},
  font: 24,
  updateFont: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [darkmode, setDarkMode] = useState(false);
  const [darkSwitch, setDarkSwitch] = useState(false);
  const [viewType, setViewType] = useState('card');
  const [font, setFont] = useState(24);

  // useEffect to initialize theme-related state
  useEffect(() => {
    function init() {
      // Retrieve dark mode setting from AsyncStorage or use device color scheme
      AsyncStorage.getItem(DARK_MODE_KEY).then(r => {
        if (r) {
          if (r === 'true') {
            setDarkMode(true);
          } else {
            setDarkMode(false);
          }
        } else {
          let colorScheme = Appearance.getColorScheme();
          if (colorScheme === 'dark') {
            AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(true));
            setDarkMode(true);
          } else {
            AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(false));
            setDarkMode(false);
          }
        }
      });
      // Retrieve dark mode toggle setting from AsyncStorage
      AsyncStorage.getItem(DARK_MODE_TOGGLE_KEY).then(r => {
        if (r) {
          if (r === 'true') {
            setDarkSwitch(true);
          } else {
            setDarkSwitch(false);
          }
        } else {
          AsyncStorage.setItem(DARK_MODE_TOGGLE_KEY, JSON.stringify(true));
          setDarkSwitch(true);
        }
      });
      // Retrieve font size setting from AsyncStorage
      AsyncStorage.getItem(FONT_SIZE_KEY).then(r => {
        if (r) {
          let f = parseInt(r, 10);
          setFont(f);
        } else {
          AsyncStorage.setItem(FONT_SIZE_KEY, '24');
          setFont(24);
        }
      });
    }
    // Initialize on component mount
    init();
  }, []);

  // Helper function to show Android toast message
  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  // Context provider with theme-related values and functions
  return (
    <ThemeContext.Provider
      value={{
        darkmode,
        toggleDarkMode: async () => {
          setDarkMode(!darkmode);
          // Toggle dark mode and save to AsyncStorage
          await AsyncStorage.setItem(DARK_MODE_KEY, JSON.stringify(!darkmode));
          showToast(!darkmode ? 'Dark Mode Enabled' : 'Light Mode Enabled');
        },
        darkSwitch,
        toggleDarkSwitch: () => {
          // Toggle dark mode switch and save to AsyncStorage
          AsyncStorage.setItem(
            DARK_MODE_TOGGLE_KEY,
            JSON.stringify(!darkSwitch),
          );
          setDarkSwitch(!darkSwitch);
          showToast(
            !darkSwitch
              ? 'Toggle in Every Page Enabled'
              : 'Toggle in Every Page Disabled',
          );
        },
        viewType,
        toggleViewType: () => {
          // Toggle view type between 'card' and 'list'
          if (viewType === 'card') {
            setViewType('list');
          } else {
            setViewType('card');
          }
        },
        font,
        updateFont: size => {
          // Update font size and save to AsyncStorage
          AsyncStorage.setItem(FONT_SIZE_KEY, size.toString());
          setFont(size);
        },
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
