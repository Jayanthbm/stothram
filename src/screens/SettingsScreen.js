// src/screens/SettingsScreen.js

import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppBar from '../components/AppBar';
import PageTitle from '../components/PageTitle';
import IconList from '../components/IconList';
import { useTheme } from '../contexts/themeContext';
import MaterialSwitch from '../components/MaterialSwitch';
import {
  dataHelper,
  getCacheThresholds,
  getItem,
  saveCacheThresholds,
  storeItem,
  DEFAULT_DATA_THRESHOLDS,
} from '../utils/dataUtils';
import { CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES } from '../utils/constants';
import {
  Animated,
  Pressable,
  ScrollView,
  Share,
  View,
  Easing,
  BackHandler,
  LayoutAnimation,
  ToastAndroid,
  Platform,
} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Card from '../components/Card';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MyText from '../components/MyText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import BottomSheetModal from '../components/BottomSheetModal';
import RNRestart from 'react-native-restart';

const ENVS = ['dev', 'stage', 'prod'];
const ENV_ICONS = {
  dev: 'hammer-wrench',
  stage: 'flask-outline',
  prod: 'rocket-launch',
};

const ENV_LABELS = {
  dev: 'Development',
  stage: 'Staging',
  prod: 'Production',
};

const CACHE_OPTIONS = [
  { label: 'No Cache (Always fetch online)', value: 0 },
  { label: '15 Minutes', value: 15 * 60 * 1000 },
  { label: '1 Hour', value: 1 * 60 * 60 * 1000 },
  { label: '2 Hours', value: 2 * 60 * 60 * 1000 },
  { label: '6 Hours', value: 6 * 60 * 60 * 1000 },
  { label: '12 Hours', value: 12 * 60 * 60 * 1000 },
  { label: '1 Day', value: 24 * 60 * 60 * 1000 },
  { label: '7 Days', value: 7 * 24 * 60 * 60 * 1000 },
  { label: '15 Days', value: 15 * 24 * 60 * 60 * 1000 },
];

const formatCacheLabel = value => {
  const match = CACHE_OPTIONS.find(opt => opt.value === value);
  if (match) return match.label;
  if (value === 0) return 'No Cache';
  const hours = value / (1000 * 60 * 60);
  if (hours < 24) return `${hours} Hours`;
  const days = hours / 24;
  return `${days} Days`;
};

const SettingsScreen = () => {
  const { theme, toggleTheme, showDarkSwitch, toggleDarkSwitch } = useTheme();
  const navigation = useNavigation();
  const [contributions, setContributions] = useState([]);

  const [devMenu, setDevMenu] = useState(false);
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [selectedEnv, setSelectedEnv] = useState('prod');
  const [thresholds, setThresholds] = useState(DEFAULT_DATA_THRESHOLDS);
  const [selectedScreenForThreshold, setSelectedScreenForThreshold] = useState(null);

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
      const devValue = (await getItem(CACHED_DATA_KEYS.DEVMENU)) || '0';
      setDevMenu(devValue === '1');
      const env = (await getItem(CACHED_DATA_KEYS.ENV)) || 'prod';
      setSelectedEnv(env);
      const currentThresholds = await getCacheThresholds();
      setThresholds(currentThresholds);
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

  // ❤️ Secret cache clear
  const heartTapCount = useRef(0);
  const heartTapTimeout = useRef(null);

  const clearLastFetchCache = async (force = false, shouldRestart = true) => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      let keysToPreserve = [
        CACHED_DATA_KEYS.DEVMENU,
        CACHED_DATA_KEYS.ENV,
        CACHED_DATA_KEYS.CACHE_THRESHOLDS,
      ];

      if (!force) {
        keysToPreserve.push(CACHED_DATA_KEYS.SETTINGS);
        keysToPreserve.push(`${CACHED_DATA_KEYS.SETTINGS}_lastFetchTime`);
      }
      const keysToRemove = keys.filter(key => !keysToPreserve.includes(key));

      if (keysToRemove.length > 0) {
        await AsyncStorage.multiRemove(keysToRemove);
      }
      const message = force
        ? `${keysToRemove.length} entries removed`
        : `${keysToRemove.length} entries removed (Settings preserved)`;
      if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert('Cache Cleared', message);
      }

      if (shouldRestart) {
        setTimeout(() => {
          RNRestart.restart();
        }, 500);
      }
    } catch (e) {
      console.error('Cache clear failed', e);
    }
  };

  const toggleDevMenu = async () => {
    let devValue = devMenu ? '0' : '1';
    try {
      if (heartTapTimeout.current) {
        clearTimeout(heartTapTimeout.current);
      }
      await storeItem(CACHED_DATA_KEYS.DEVMENU, devValue);

      // If dev. menu is disabled, clear cache and set the env to prod
      if (devValue === '0') {
        await storeItem(CACHED_DATA_KEYS.ENV, 'prod');
        await clearLastFetchCache(true, true);
      }
    } finally {
      setDevMenu(devValue === '1');
    }
  };

  const switchEnv = async env => {
    if (env === selectedEnv) {
      return;
    }
    await storeItem(CACHED_DATA_KEYS.ENV, env);
    setSelectedEnv(env);
    await clearLastFetchCache(true, true);
  };

  const updateThresholdValue = async (screenType, newValue) => {
    const updated = { ...thresholds, [screenType]: newValue };
    setThresholds(updated);
    await saveCacheThresholds(updated);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Cache timing updated', ToastAndroid.SHORT);
    }
  };

  const onHeartPress = () => {
    heartTapCount.current += 1;

    // reset timer
    if (heartTapTimeout.current) {
      clearTimeout(heartTapTimeout.current);
    }

    heartTapTimeout.current = setTimeout(() => {
      heartTapCount.current = 0;
    }, 2000); // 2 sec window

    if (heartTapCount.current === 5) {
      heartTapCount.current = 0;
      toggleDevMenu();
    }
  };

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

        {!devMenu && (
          <>
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
          </>
        )}

        {devMenu && (
          <>
            <PageTitle title="Dev Menu" />

            <IconList
              keyName="toggle-dev-menu"
              onPress={toggleDevMenu}
              leftIcon="code-json"
              title="Dev Menu"
              subtitle="Enable or disable developer options"
              rightContent={
                <MaterialSwitch
                  value={devMenu}
                  onValueChange={toggleDevMenu}
                />
              }
            />

            <IconList
              keyName="environment"
              leftIcon={ENV_ICONS[selectedEnv]}
              title="Environment"
              subtitle={`Selected environment ${selectedEnv}`}
              onPress={() => setShowEnvModal(true)}
            />

            <IconList
              key={`clear-cache`}
              disabled={false}
              keyName={`clear-cache`}
              leftIcon={'cached'}
              title={'Clear Cache'}
              subtitle={'Clear app cache'}
              onPress={() => clearLastFetchCache(false, true)}
            />

            <PageTitle title="Cache Timings" />
            <IconList
              keyName="cache-home"
              leftIcon="home-clock-outline"
              title="Home Screen Cache"
              subtitle={`Current: ${formatCacheLabel(thresholds.HOME)}`}
              onPress={() => setSelectedScreenForThreshold('HOME')}
            />
            <IconList
              keyName="cache-list"
              leftIcon="format-list-checks"
              title="List Screen Cache"
              subtitle={`Current: ${formatCacheLabel(thresholds.LIST)}`}
              onPress={() => setSelectedScreenForThreshold('LIST')}
            />
            <IconList
              keyName="cache-reader"
              leftIcon="book-open-page-variant-outline"
              title="Reader Screen Cache"
              subtitle={`Current: ${formatCacheLabel(thresholds.READER)}`}
              onPress={() => setSelectedScreenForThreshold('READER')}
            />
            <IconList
              keyName="cache-setting"
              leftIcon="cog-sync-outline"
              title="Settings Screen Cache"
              subtitle={`Current: ${formatCacheLabel(thresholds.SETTING)}`}
              onPress={() => setSelectedScreenForThreshold('SETTING')}
            />
          </>
        )}

        {/* ---Bottom Section --- */}
        <View style={{ marginTop: 10, marginBottom: 30 }}>
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
              marginTop: 20,
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

            <Pressable onPress={onHeartPress} hitSlop={10}>
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
            </Pressable>

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

        <BottomSheetModal
          title="Select Environment"
          visible={showEnvModal}
          closeModal={() => setShowEnvModal(false)}
        >
          {ENVS.map(item => (
            <IconList
              keyName={`env-${item}`}
              key={`env-${item}`}
              leftIcon={ENV_ICONS[item]}
              title={ENV_LABELS[item]}
              subtitle={
                selectedEnv === item
                  ? 'Currently selected'
                  : `Switch to ${item} environment`
              }
              onPress={async () => {
                setShowEnvModal(false);

                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );

                requestAnimationFrame(async () => {
                  await switchEnv(item);
                });
              }}
              disabled={selectedEnv === item}
              rightContent={
                selectedEnv === item ? (
                  <MaterialDesignIcons
                    name="check-decagram"
                    size={24}
                    color={theme.colors.primary}
                  />
                ) : null
              }
            />
          ))}
        </BottomSheetModal>

        <BottomSheetModal
          title={`Select Cache Duration for ${selectedScreenForThreshold || ''}`}
          visible={!!selectedScreenForThreshold}
          closeModal={() => setSelectedScreenForThreshold(null)}
        >
          {CACHE_OPTIONS.map(opt => {
            const isSelected =
              selectedScreenForThreshold &&
              thresholds[selectedScreenForThreshold] === opt.value;
            return (
              <IconList
                keyName={`cache-opt-${opt.value}`}
                key={`cache-opt-${opt.value}`}
                leftIcon={opt.value === 0 ? 'cloud-sync-outline' : 'clock-outline'}
                title={opt.label}
                subtitle={isSelected ? 'Currently active' : 'Tap to apply'}
                disabled={isSelected}
                onPress={async () => {
                  const screenKey = selectedScreenForThreshold;
                  setSelectedScreenForThreshold(null);

                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );

                  requestAnimationFrame(async () => {
                    await updateThresholdValue(screenKey, opt.value);
                  });
                }}
                rightContent={
                  isSelected ? (
                    <MaterialDesignIcons
                      name="check-decagram"
                      size={24}
                      color={theme.colors.primary}
                    />
                  ) : null
                }
              />
            );
          })}
        </BottomSheetModal>
      </ScrollView>
    </>
  );
};

export default SettingsScreen;
