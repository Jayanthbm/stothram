import React from 'react';
import Navigation from './src/Navigation';
import { ThemeProvider } from './src/contexts/themeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
