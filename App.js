import Navigation from './src/Navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/themeContext';
import { enableScreens } from 'react-native-screens';
// Optimize navigation stack rendering
enableScreens();

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
