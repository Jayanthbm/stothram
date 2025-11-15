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
import Card from '../components/Card';
import BottomSheetModal from '../components/BottomSheetModal';
import IconList from '../components/IconList';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import NoDataCard from '../components/NoDataCard';
import MaterialSlider from '../components/MaterialSlider';
import ScrolltoTopIcon from '../components/ScrolltoTopIcon';
import { dataHelper } from '../utils/dataUtils';
import { SCREEN_NAMES } from '../utils/constants';
import { useTheme } from '../contexts/themeContext';
import MyText from '../components/MyText';

const fontWeights = { brhknde: 600 };
const LANGUAGE_MAPPER = { kn: 'Kannada', en: 'English' };

const ReaderScreen = ({ route }) => {
  const { item, type } = route.params;
  const navigation = useNavigation();
  const { theme, toggleTheme, showDarkSwitch, font, updateFont } = useTheme();

  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [readerData, setReaderData] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
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

  // 🔹 Right icons (theme + toggle view)
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

  // 🔹 Fetch reader data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          item?.title,
          item?.dataUrl,
          SCREEN_NAMES.READER,
        );
        if (fetchedData) {
          setFetchedData(fetchedData);
          if (fetchedData.translations) {
            const langs = Object.keys(fetchedData.translations);
            setLanguages(langs);
            setCurrentLanguage(langs[0]);
          } else {
            setReaderData(fetchedData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    setDisplayTitle(item.displayTitle);
    setTitle(item?.title);
    if (item?.dataUrl) fetchData();
  }, [item]);

  // 🔹 Update when switching language
  useEffect(() => {
    if (currentLanguage && fetchedData?.translations) {
      const nextData = fetchedData.translations[currentLanguage];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setReaderData(nextData);
      setDisplayTitle(nextData.title);
    }
  }, [currentLanguage]);

  // ✅ Scroll listener for scroll-to-top button
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

  // ✅ Handle hardware back only when screen focused
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

  const renderItem = ({ item }) => {
    if (item.type === 'paragraph') {
      return (
        <Card key={item.id} disableRipple={true}>
          {item.lines.map((line, index) =>
            line?.trim() ? (
              <MyText
                key={index}
                style={{
                  fontFamily: item?.fontFamily,
                  fontWeight: fontWeights[item.fontFamily] || '700',
                  lineHeight:
                    item.fontFamily === 'brhknde'
                      ? parseInt(font) + 17
                      : parseInt(font) + 14,
                  fontSize: item.fontFamily === 'brhknde' ? font + 2 : font,
                }}
              >
                {line}
              </MyText>
            ) : (
              <MyText key={`gap-${index}`} style={{ height: 8 }} />
            ),
          )}
        </Card>
      );
    } else if (item.type === 'subheading') {
      return (
        <Card
          key={item.id}
          style={{
            backgroundColor: theme.colors.surfaceVariant,
            padding: 2,
          }}
        >
          <MyText
            key={item.id}
            style={{
              fontFamily: item?.fontFamily,
              fontSize: font + 2,
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {item.title}
          </MyText>
        </Card>
      );
    }
  };

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
        key={`${title}-${currentLanguage}`}
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
