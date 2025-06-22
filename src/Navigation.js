import React, { useContext } from 'react';

import { COLOR_SCHEME } from './styles/styles';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import { NavigationContainer } from '@react-navigation/native';
import ReaderScreen from './screens/ReaderScreen';
import SettingsScreen from './screens/SettingsScreen';
import { ThemeContext } from './contexts/themeContext';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigation = () => {
  const { darkmode } = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'left',
          statusBarTranslucent: false,
          headerStyle: {
            backgroundColor: darkmode
              ? COLOR_SCHEME.DARK.headerBackground
              : COLOR_SCHEME.LIGHT.headerBackground,
          },
          headerTintColor: darkmode
            ? COLOR_SCHEME.DARK.headertext
            : COLOR_SCHEME.LIGHT.headertext,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            fontFamily: 'NotoSans',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Reader" component={ReaderScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
