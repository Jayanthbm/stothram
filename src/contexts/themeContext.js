// src/contexts/themeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from '../theme/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 🔹 System & defaults
  const systemScheme = Appearance.getColorScheme() || 'light';
  const [themeMode, setThemeMode] = useState(systemScheme);
  const [theme, setTheme] = useState({
    colors: systemScheme === 'dark' ? darkColors : lightColors,
    mode: systemScheme,
  });

  // 🔹 Additional user preferences
  const [viewType, setViewType] = useState('card'); // 'card' | 'list'
  const [font, setFont] = useState(24); // default 24
  const [showDarkSwitch, setShowDarkSwitch] = useState(true);

  // Load saved preferences
  useEffect(() => {
    (async () => {
      try {
        const savedMode = await AsyncStorage.getItem('themeMode');
        const savedView = await AsyncStorage.getItem('viewType');
        const savedFont = await AsyncStorage.getItem('fontSize');
        const savedSwitch = await AsyncStorage.getItem('showDarkSwitch');

        if (savedMode) {
          setThemeMode(savedMode);
          setTheme({
            colors: savedMode === 'dark' ? darkColors : lightColors,
            mode: savedMode,
          });
        }
        if (savedView) setViewType(savedView);
        if (savedFont) setFont(Number(savedFont));
        if (savedSwitch) setShowDarkSwitch(savedSwitch === 'true');
      } catch (err) {
        console.warn('Error loading theme settings:', err);
      }
    })();
  }, []);

  // 🔹 React to system theme changes (if using system)
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        setTheme({
          colors: colorScheme === 'dark' ? darkColors : lightColors,
          mode: colorScheme,
        });
      }
    });
    return () => listener.remove();
  }, [themeMode]);

  // ====== THEME MODE HANDLERS ======
  const toggleTheme = async () => {
    const nextMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);
    setTheme({
      colors: nextMode === 'dark' ? darkColors : lightColors,
      mode: nextMode,
    });
    await AsyncStorage.setItem('themeMode', nextMode);
  };

  const setThemePreference = async mode => {
    const colorScheme =
      mode === 'system' ? Appearance.getColorScheme() || 'light' : mode;
    setTheme({
      colors: colorScheme === 'dark' ? darkColors : lightColors,
      mode: colorScheme,
    });
    setThemeMode(mode);
    await AsyncStorage.setItem('themeMode', mode);
  };

  // ====== VIEW TYPE ======
  const toggleViewType = async () => {
    const next = viewType === 'card' ? 'list' : 'card';
    setViewType(next);
    await AsyncStorage.setItem('viewType', next);
  };

  // ====== FONT ======
  const updateFont = async size => {
    setFont(size);
    await AsyncStorage.setItem('fontSize', size.toString());
  };

  // ====== SHOW DARK SWITCH ======
  const toggleDarkSwitch = async () => {
    const next = !showDarkSwitch;
    setShowDarkSwitch(next);
    await AsyncStorage.setItem('showDarkSwitch', next.toString());
  };

  // ====== CONTEXT VALUE ======
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        toggleTheme,
        setThemePreference,

        viewType,
        toggleViewType,

        font,
        updateFont,

        showDarkSwitch,
        toggleDarkSwitch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// 🔹 Custom hook
export const useTheme = () => useContext(ThemeContext);
