// App.jsx

import React from 'react';
import { ThemeProvider, useTheme } from './src/contexts/themeContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import HomeScreen from './src/screens/HomeScreen';
import ListScreen from './src/screens/ListScreen';
import ReaderScreen from './src/screens/ReaderScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { theme } = useTheme();
  return (
    <NavigationContainer
      theme={{
        dark: false,
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
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
        edges={['top', 'bottom']}
      >
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="List" component={ListScreen} />
          <Stack.Screen name="Reader" component={ReaderScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
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
