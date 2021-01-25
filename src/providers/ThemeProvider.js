import React, {useState, useEffect} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Toast} from 'native-base';
const darkBackground = '#3A3B3C';
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
      AsyncStorage.getItem('@darkmode').then((r) => {
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
      AsyncStorage.getItem('@darkmodetoggle').then((r) => {
        if (r) {
          if (r === 'true') {
            setDarkSwitch(true);
          } else {
            setDarkSwitch(false);
          }
        } else {
          AsyncStorage.setItem('@darkmodetoggle', JSON.stringify(false));
          setDarkSwitch(false);
        }
      });
      AsyncStorage.getItem('@fontSize').then((r) => {
        if (r) {
          let f = parseInt(r, 10);
          setFont(f);
        } else {
          AsyncStorage.setItem('@fontSize', 24);
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
            Toast.show({
              text: 'Light Mode Enabled',
              duration: 1000,
              position: 'bottom',
              style: {backgroundColor: '#455559'},
            });
          } else {
            Toast.show({
              text: 'Dark Mode Enabled',
              duration: 1000,
              position: 'bottom',
              style: {backgroundColor: '#455559'},
            });
          }
        },
        darkSwitch,
        toggleDarkSwitch: () => {
          AsyncStorage.setItem('@darkmodetoggle', JSON.stringify(!darkSwitch));
          setDarkSwitch(!darkSwitch);
          if (darkSwitch) {
            Toast.show({
              text: 'Toggle in Every Page Disabled',
              duration: 1000,
              position: 'bottom',
              style: {backgroundColor: '#455559'},
            });
          } else {
            Toast.show({
              text: 'Toggle in Every Page Enabled',
              duration: 1000,
              position: 'bottom',
              style: {backgroundColor: '#455559'},
            });
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
        updateFont: (size) => {
          AsyncStorage.setItem('@fontSize', size.toString());
          setFont(size);
        },
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
