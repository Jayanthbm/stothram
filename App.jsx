// App.jsx

import React, { useMemo } from 'react';
import { ThemeProvider, useTheme } from './src/contexts/themeContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import ReaderScreen from './src/screens/ReaderScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Constants
import { SCREEN_NAMES } from './src/utils/constants';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { theme } = useTheme();

  const navigationTheme = useMemo(
    () => ({
      dark: theme.isDark,
      colors: {
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.onSurface,
        border: theme.colors.outline,
        primary: theme.colors.primary,
        notification: theme.colors.error,
      },
      fonts: {
        regular: { fontFamily: 'System', fontWeight: '400' },
        medium: { fontFamily: 'System', fontWeight: '500' },
        light: { fontFamily: 'System', fontWeight: '300' },
        thin: { fontFamily: 'System', fontWeight: '100' },
      },
    }),
    [theme],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        edges={['top', 'bottom']}
      >
        <Stack.Navigator
          initialRouteName={SCREEN_NAMES.HOME}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name={SCREEN_NAMES.HOME} component={HomeScreen} />
          <Stack.Screen name={SCREEN_NAMES.LIST} component={ListScreen} />
          <Stack.Screen name={SCREEN_NAMES.READER} component={ReaderScreen} />
          <Stack.Screen
            name={SCREEN_NAMES.SETTINGS}
            component={SettingsScreen}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
