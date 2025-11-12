// src/contexts/themeContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
    isDark: systemScheme === 'dark',
  });

  // 🔹 Additional user preferences
  const [viewType, setViewType] = useState('card'); // 'card' | 'list'
  const [font, setFont] = useState(24); // default 24
  const [showDarkSwitch, setShowDarkSwitch] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSlider, setShowSlider] = useState(true);

  // Load saved preferences
  useEffect(() => {
    (async () => {
      try {
        const [savedMode, savedView, savedFont, savedSwitch, savedSlider] =
          await Promise.all([
            AsyncStorage.getItem('themeMode'),
            AsyncStorage.getItem('viewType'),
            AsyncStorage.getItem('fontSize'),
            AsyncStorage.getItem('showDarkSwitch'),
            AsyncStorage.getItem('showSlider'),
          ]);

        if (savedMode) {
          const colorScheme =
            savedMode === 'system'
              ? Appearance.getColorScheme() || 'light'
              : savedMode;
          setTheme({
            colors: colorScheme === 'dark' ? darkColors : lightColors,
            mode: colorScheme,
            isDark: colorScheme === 'dark',
          });
          setThemeMode(savedMode);
        }
        if (savedView) setViewType(savedView);
        if (savedFont) setFont(Number(savedFont));
        if (savedSwitch) setShowDarkSwitch(savedSwitch === 'true');
        if (savedSlider) setShowSlider(savedSlider === 'true');
      } catch (err) {
        console.warn('Error loading theme settings:', err);
      } finally {
        setIsLoaded(true);
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
          isDark: colorScheme === 'dark',
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
      isDark: nextMode === 'dark',
    });
    try {
      await AsyncStorage.setItem('themeMode', nextMode);
    } catch (err) {
      console.warn('Error saving theme mode:', err);
    }
  };

  const setThemePreference = async mode => {
    const colorScheme =
      mode === 'system' ? Appearance.getColorScheme() || 'light' : mode;
    setTheme({
      colors: colorScheme === 'dark' ? darkColors : lightColors,
      mode: colorScheme,
      isDark: colorScheme === 'dark',
    });
    setThemeMode(mode);
    try {
      await AsyncStorage.setItem('themeMode', mode);
    } catch (err) {
      console.warn('Error saving theme mode:', err);
    }
  };

  // ====== VIEW TYPE ======
  const toggleViewType = async () => {
    try {
      const next = viewType === 'card' ? 'list' : 'card';
      setViewType(next);
      await AsyncStorage.setItem('viewType', next);
    } catch (err) {
      console.warn('Error saving view type:', err);
    }
  };

  // ====== FONT ======
  const updateFont = async size => {
    try {
      setFont(size);
      await AsyncStorage.setItem('fontSize', size.toString());
    } catch (err) {
      console.warn('Error saving font size:', err);
    }
  };

  // ====== SHOW DARK SWITCH ======
  const toggleDarkSwitch = async () => {
    try {
      const next = !showDarkSwitch;
      setShowDarkSwitch(next);
      await AsyncStorage.setItem('showDarkSwitch', next.toString());
    } catch (err) {
      console.warn('Error saving dark switch setting:', err);
    }
  };

  // ====== SHOW SLIDER ======
  const toggleSlider = async () => {
    try {
      const next = !showSlider;
      setShowSlider(next);
      await AsyncStorage.setItem('showSlider', next.toString());
    } catch (err) {
      console.warn('Error saving slider setting:', err);
    }
  };

  // ====== CONTEXT VALUE ======

  const value = useMemo(
    () => ({
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
      showSlider,
      toggleSlider,
    }),
    [theme, themeMode, viewType, font, showDarkSwitch, showSlider],
  );

  if (!isLoaded) return null;
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 🔹 Custom hook
export const useTheme = () => useContext(ThemeContext);
