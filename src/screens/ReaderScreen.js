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
import { dataHelper } from '../utils/dataUtils';
import { getAvailableLanguages, getFontForLanguage } from '../utils/readerUtils';
import { SCREEN_NAMES } from '../utils/constants';
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

  // 🔹 Right AppBar icons (theme toggle + language modal)
  const rightIcons = useMemo(() => {
    const icons = [];
    if (showDarkSwitch)
      icons.push({ iconName: 'theme-light-dark', onPress: toggleTheme });
    if (languages && languages.length > 1)
      icons.push({
        iconName: 'translate',
        onPress: () => setShowLanguageModal(true),
      });
    return icons;
  }, [showDarkSwitch, toggleTheme, languages]);

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
          setDisplayTitle(fetchedData.title || item?.displayTitle || item?.title);

          const defaultLang = fetchedData.defaultLanguage || 'kn';
          const availableLangs = getAvailableLanguages(fetchedData.supportedLanguages);

          setLanguages(availableLangs);
          setCurrentLanguage(defaultLang);
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

  // ✅ Handle hardware back press cleanly
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate(SCREEN_NAMES.LIST, { type });
        return true;
      };
      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => sub.remove();
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
          />
        );
      }

      if (contentType === 'subheading') {
        return (
          <ReaderSubheading
            title={contentItem.title}
            fontFamily={fontFamily}
            font={font}
          />
        );
      }

      return null;
    },
    [readerData?.fonts, readerData?.audio, currentLanguage, font],
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title={displayTitle} rightIcons={rightIcons} />
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
    </View>
  );
};

export default ReaderScreen;
