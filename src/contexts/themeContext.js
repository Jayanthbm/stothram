import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Appearance, ToastAndroid} from 'react-native';

const darkBackground = '#5e5e5c';
const lightBackground = '#fff';
const darkTextcolor = '#fff';
const lightTextcolor = '#000';
const darkHeaderBackground = '#878683';
const lightHeaderBackground = '#6200EE';

export const ThemeContext = React.createContext({
  darkmode: false,
  toggleDarkMode: () => {},
  darkSwitch: false,
  toggleDarkSwitch: () => {},
  backgroundColor: lightBackground,
  textColor: lightTextcolor,
  headerBackground: lightHeaderBackground,
  viewType: 'card',
  toggleViewType: () => {},
  font: 24,
  updateFont: () => {},
});

export const ThemeProvider = ({children}) => {
  const [darkmode, setDarkMode] = useState(false);
  const [darkSwitch, setDarkSwitch] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(lightBackground);
  const [textColor, setTextColor] = useState(lightTextcolor);
  const [headerBackground, setHeaderBackground] = useState(
    lightHeaderBackground,
  );
  const [viewType, setViewType] = useState('card');
  const [font, setFont] = useState(24);

  useEffect(() => {
    function init() {
      AsyncStorage.getItem('@darkmode').then(r => {
        if (r) {
          if (r === 'true') {
            setDarkMode(true);
            setBackgroundColor(darkBackground);
            setTextColor(darkTextcolor);
            setHeaderBackground(darkHeaderBackground);
          } else {
            setDarkMode(false);
            setBackgroundColor(lightBackground);
            setTextColor(lightTextcolor);
            setHeaderBackground(lightHeaderBackground);
          }
        } else {
          let colorScheme = Appearance.getColorScheme();
          if (colorScheme === 'dark') {
            AsyncStorage.setItem('@darkmode', JSON.stringify(true));
            setDarkMode(true);
            setBackgroundColor(darkBackground);
            setTextColor(darkTextcolor);
            setHeaderBackground(darkHeaderBackground);
          } else {
            AsyncStorage.setItem('@darkmode', JSON.stringify(false));
            setDarkMode(false);
            setBackgroundColor(lightBackground);
            setTextColor(lightTextcolor);
            setHeaderBackground(lightHeaderBackground);
          }
        }
      });
      AsyncStorage.getItem('@darkmodetoggle').then(r => {
        if (r) {
          if (r === 'true') {
            setDarkSwitch(true);
          } else {
            setDarkSwitch(false);
          }
        } else {
          AsyncStorage.setItem('@darkmodetoggle', JSON.stringify(true));
          setDarkSwitch(true);
        }
      });
      AsyncStorage.getItem('@fontSize').then(r => {
        if (r) {
          let f = parseInt(r, 10);
          setFont(f);
        } else {
          AsyncStorage.setItem('@fontSize', '24');
          setFont(24);
        }
      });
    }
    init();
  }, [darkmode, darkSwitch, font]);
  return (
    <ThemeContext.Provider
      value={{
        darkmode,
        toggleDarkMode: () => {
          AsyncStorage.setItem('@darkmode', JSON.stringify(!darkmode));
          setDarkMode(!darkmode);
          if (darkmode) {
            ToastAndroid.show('Light Mode Enabled', ToastAndroid.SHORT);
          } else {
            ToastAndroid.show('Dark Mode Enabled', ToastAndroid.SHORT);
          }
        },
        darkSwitch,
        toggleDarkSwitch: () => {
          AsyncStorage.setItem('@darkmodetoggle', JSON.stringify(!darkSwitch));
          setDarkSwitch(!darkSwitch);
          if (darkSwitch) {
            ToastAndroid.show(
              'Toggle in Every Page Disabled',
              ToastAndroid.SHORT,
            );
          } else {
            ToastAndroid.show(
              'Toggle in Every Page Enabled',
              ToastAndroid.SHORT,
            );
          }
        },
        backgroundColor,
        textColor,
        headerBackground,
        viewType,
        toggleViewType: () => {
          if (viewType === 'card') {
            setViewType('list');
          } else {
            setViewType('card');
          }
        },
        font,
        updateFont: size => {
          AsyncStorage.setItem('@fontSize', size.toString());
          setFont(size);
        },
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
