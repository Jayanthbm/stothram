// src/screens/SettingsScreen.js

import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppBar from '../components/AppBar';
import PageTitle from '../components/PageTitle';
import IconList from '../components/IconList';
import { useTheme } from '../contexts/themeContext';
import MaterialSwitch from '../components/MaterialSwitch';
import { dataHelper } from '../utils/dataUtils';
import { CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES } from '../utils/constants';
import {
  Animated,
  Pressable,
  ScrollView,
  Share,
  View,
  Easing,
  BackHandler,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Card from '../components/Card';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MyText from '../components/MyText';

const SettingsScreen = () => {
  const { theme, toggleTheme, showDarkSwitch, toggleDarkSwitch } = useTheme();
  const navigation = useNavigation();
  const [contributions, setContributions] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await dataHelper(
        CACHED_DATA_KEYS.SETTINGS,
        DATA_URLS.SETTINGS,
        SCREEN_NAMES.SETTINGS,
      );
      // Update state with fetched contributions
      if (fetchedData) {
        setContributions(
          Array.isArray(fetchedData?.contributions)
            ? fetchedData.contributions
            : [],
        );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Handle hardware back only when screen focused
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate(SCREEN_NAMES.HOME);
        }
        return true;
      };

      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => sub.remove();
    }, [navigation]),
  );

  const PLAY_STORE_URL =
    'https://play.google.com/store/apps/details?id=com.jayanth.shotram';

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing Stothram app!\n\n${PLAY_STORE_URL}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ❤️ Heart animation
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scaleAnim]);

  return (
    <>
      <AppBar title="Settings" />
      <ScrollView
        style={{ paddingHorizontal: 16, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <PageTitle title="General Settings" />
        <IconList
          keyName="mode"
          onPress={toggleTheme}
          leftIcon="palette-outline"
          title="Dark Theme"
          subtitle="Reduce glare and improve night viewing"
          rightContent={
            <MaterialSwitch value={theme.isDark} onValueChange={toggleTheme} />
          }
        />
        <IconList
          keyName="toggle"
          onPress={toggleDarkSwitch}
          leftIcon="theme-light-dark"
          title="Toggle in Every Page"
          subtitle="Show option to toggle dark mode in every screen"
          rightContent={
            <MaterialSwitch
              value={showDarkSwitch}
              onValueChange={toggleDarkSwitch}
            />
          }
        />

        <PageTitle title="Contributions" />
        <Card keyName="contributors" disableRipple={true}>
          {contributions?.map(({ name, role }, index) => (
            <View key={index}>
              <IconList
                key={`${name}-${role}`}
                disabled={false}
                keyName={`contributions-${name}`}
                leftIcon={
                  role === 'Editor'
                    ? 'pencil-outline'
                    : role === 'Developer'
                      ? 'code-tags'
                      : 'account-outline'
                }
                title={name}
                subtitle={role}
              />
              {index < contributions.length - 1 && (
                <View
                  style={{
                    backgroundColor: theme.colors.skeletonBackground,
                    width: '100%',
                    height: 1,
                  }}
                />
              )}
            </View>
          ))}
        </Card>

        {/* ---Bottom Section --- */}
        <View style={{ marginTop: 24, marginBottom: 40 }}>
          <Pressable
            onPress={onShare}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.surfaceVariant,
              paddingVertical: 14,
              borderRadius: 16,
              flexDirection: 'row',
            }}
          >
            <MaterialDesignIcons
              name="share-variant"
              size={22}
              color={theme.colors.primary}
            />
            <MyText
              style={{
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 10,
              }}
            >
              Share App with friends & family
            </MyText>
          </Pressable>

          <View
            style={{
              marginTop: 28,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <MyText
              style={{
                color: theme.colors.onSurfaceVariant,
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              Made with
            </MyText>

            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                marginHorizontal: 6,
              }}
            >
              <MaterialDesignIcons
                name="heart"
                size={22}
                color={theme.colors.error}
              />
            </Animated.View>

            <MyText
              style={{
                color: theme.colors.onSurfaceVariant,
                fontSize: 16,
                fontWeight: '600',
              }}
            >
              in India 🇮🇳
            </MyText>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SettingsScreen;
