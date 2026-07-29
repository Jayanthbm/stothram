// src/screens/ReaderScreen.js
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  BackHandler,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AppBar from '../components/AppBar';
import BottomSheetModal from '../components/BottomSheetModal';
import IconList from '../components/IconList';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import NoDataCard from '../components/NoDataCard';
import MaterialSlider from '../components/MaterialSlider';
import ScrolltoTopIcon from '../components/ScrolltoTopIcon';
import ReaderParagraph from '../components/ReaderParagraph';
import ReaderSubheading from '../components/ReaderSubheading';
import ReaderAudioButton from '../components/ReaderAudioButton';
import { dataHelper } from '../utils/dataUtils';
import {
  getAvailableLanguages,
  getAvailableMeaningLanguages,
  getFontForLanguage,
  hasMeaningsInContent,
} from '../utils/readerUtils';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { stopAudioTrack } from '../services/audioService';
import { CACHED_DATA_KEYS, SCREEN_NAMES } from '../utils/constants';

import { useTheme } from '../contexts/themeContext';

const LANGUAGE_MAPPER = { kn: 'Kannada', en: 'English' };

const ReaderScreen = ({ route }) => {
  const { item, type } = route.params;
  const navigation = useNavigation();
  const { theme, toggleTheme, showDarkSwitch, font, updateFont } = useTheme();

  const [displayTitle, setDisplayTitle] = useState('');
  const [readerData, setReaderData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('kn');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  const listRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const toTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setShowScrollIcon(false));
  };

  const [showMeanings, setShowMeanings] = useState(false);
  const [meaningLanguage, setMeaningLanguage] = useState(null);
  const [showMeaningLanguageModal, setShowMeaningLanguageModal] =
    useState(false);

  // Load saved meaning language on mount
  useEffect(() => {
    const loadSavedMeaningLang = async () => {
      try {
        const savedLang = await AsyncStorage.getItem(
          CACHED_DATA_KEYS.MEANING_LANGUAGE,
        );
        if (savedLang) {
          setMeaningLanguage(savedLang);
        }
      } catch (err) {
        console.error('Error loading saved meaning language:', err);
      }
    };
    loadSavedMeaningLang();
  }, []);

  const handleSelectMeaningLanguage = async lang => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMeaningLanguage(lang);
    setShowMeaningLanguageModal(false);
    try {
      await AsyncStorage.setItem(CACHED_DATA_KEYS.MEANING_LANGUAGE, lang);
    } catch (err) {
      console.error('Error saving meaning language:', err);
    }
  };

  // Check if reader data has meanings populated
  const hasMeanings = useMemo(() => {
    return hasMeaningsInContent(readerData);
  }, [readerData]);

  const [meaningLanguages, setMeaningLanguages] = useState([]);

  // 🔹 Right AppBar icons (max 3 icons; hide theme toggle if Meaning, Meaning Language, and Translate are all present)
  const rightIcons = useMemo(() => {
    const icons = [];
    const hasMeaningLangIcon = hasMeanings && meaningLanguages.length > 1;
    const hasTranslateIcon = languages && languages.length > 1;

    // Hide dark/light switch if all 3 feature icons (Meaning, Meaning Lang, Translate) are present
    const hideThemeForThreeIcons =
      hasMeanings && hasMeaningLangIcon && hasTranslateIcon;

    if (showDarkSwitch && !hideThemeForThreeIcons) {
      icons.push({ iconName: 'theme-light-dark', onPress: toggleTheme });
    }

    if (hasMeanings) {
      icons.push({
        iconName: showMeanings ? 'book-open-variant' : 'book-outline',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShowMeanings(prev => !prev);
        },
      });
      if (hasMeaningLangIcon) {
        icons.push({
          iconName: 'subtitles-outline',
          onPress: () => setShowMeaningLanguageModal(true),
        });
      }
    }

    if (hasTranslateIcon) {
      icons.push({
        iconName: 'translate',
        onPress: () => setShowLanguageModal(true),
      });
    }

    // Ensure maximum 3 icons strictly
    return icons.slice(0, 3);
  }, [
    showDarkSwitch,
    toggleTheme,
    hasMeanings,
    showMeanings,
    meaningLanguages,
    languages,
  ]);

  // 🔹 Fetch reader data adhering ONLY to the new schema
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          item?.title,
          item?.dataUrl,
          SCREEN_NAMES.READER,
        );
        if (fetchedData) {
          setReaderData(fetchedData);
          setDisplayTitle(
            fetchedData.title || item?.displayTitle || item?.title,
          );

          const defaultLang = fetchedData.defaultLanguage || 'kn';
          const availableLangs = getAvailableLanguages(
            fetchedData.supportedLanguages,
          );
          const availableMeaningLangs =
            getAvailableMeaningLanguages(fetchedData);

          setLanguages(availableLangs);
          setCurrentLanguage(defaultLang);
          setMeaningLanguages(availableMeaningLangs);
        }
      } catch (error) {
        console.error('Error fetching reader data:', error);
      }
    };

    setDisplayTitle(item?.displayTitle || item?.title);
    if (item?.dataUrl) fetchData();
  }, [item]);

  // ✅ Scroll listener for floating scroll-to-top button
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const shouldShow = offsetY > 250;

    if (shouldShow && !showScrollIcon) {
      setShowScrollIcon(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (!shouldShow && showScrollIcon) {
      setShowScrollIcon(false);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 20,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  // ✅ Handle hardware back press cleanly & stop audio when leaving reader screen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        stopAudioTrack();
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate(SCREEN_NAMES.LIST, { type });
        return true;
      };
      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => {
        sub.remove();
        stopAudioTrack();
      };
    }, [navigation, type]),
  );

  // 🔹 Render item callback using modular components
  const renderItem = useCallback(
    ({ item: contentItem }) => {
      const contentType = contentItem.type || 'paragraph';
      const fontFamily = getFontForLanguage(
        readerData?.fonts,
        currentLanguage,
        contentType,
      );

      if (contentType === 'paragraph') {
        return (
          <ReaderParagraph
            item={contentItem}
            globalAudio={readerData?.audio}
            fontFamily={fontFamily}
            font={font}
            currentLanguage={currentLanguage}
            showMeanings={showMeanings}
            meaningLanguage={meaningLanguage}
          />
        );
      }

      if (contentType === 'subheading') {
        return (
          <ReaderSubheading
            item={contentItem}
            fontFamily={fontFamily}
            font={font}
          />
        );
      }

      return null;
    },
    [
      readerData?.fonts,
      readerData?.audio,
      currentLanguage,
      font,
      showMeanings,
      meaningLanguage,
    ],
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title={displayTitle} rightIcons={rightIcons} />

      {/* 🎵 Top Audio Player (Full width) */}
      <ReaderAudioButton
        audioUrl={readerData?.audio?.url}
        isTopPlayer={true}
        title={item?.title}
        displayTitle={displayTitle}
      />

      <MaterialSlider
        value={font}
        onValueChange={updateFont}
        min={15}
        max={30}
        step={1}
      />

      <FlatList
        ref={listRef}
        data={readerData?.content}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={10}
        windowSize={5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        key={`${item?.title}-${currentLanguage}`}
        ListEmptyComponent={<NoDataCard title="No content available" />}
      />

      {/* 🌟 Floating Scroll to Top Button */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <ScrolltoTopIcon
          visible={showScrollIcon}
          onPress={toTop}
          align="right"
        />
      </Animated.View>

      <BottomSheetModal
        title={'Choose Language'}
        visible={showLanguageModal}
        closeModal={() => setShowLanguageModal(false)}
      >
        {languages?.map(language => (
          <IconList
            key={language}
            title={LANGUAGE_MAPPER[language] || language.toUpperCase()}
            leftIcon="translate-variant"
            subtitle={`Change language to ${
              LANGUAGE_MAPPER[language] || language
            }`}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setCurrentLanguage(language);
              setShowLanguageModal(false);
            }}
            rightContent={
              currentLanguage === language ? (
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

      {/* 🔹 Meaning Language Selector Modal */}
      <BottomSheetModal
        title={'Choose Meaning Language'}
        visible={showMeaningLanguageModal}
        closeModal={() => setShowMeaningLanguageModal(false)}
      >
        {meaningLanguages?.map(lang => (
          <IconList
            key={lang}
            title={LANGUAGE_MAPPER[lang] || lang.toUpperCase()}
            leftIcon="subtitles-outline"
            subtitle={`Display meanings in ${LANGUAGE_MAPPER[lang] || lang}`}
            onPress={() => handleSelectMeaningLanguage(lang)}
            rightContent={
              (meaningLanguage || currentLanguage) === lang ? (
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
    </View>
  );
};

const styles = StyleSheet.create({
  topControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default ReaderScreen;
