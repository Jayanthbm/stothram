// src/screens/ReaderScreen.js

import React, { useEffect, useMemo, useRef, useState } from 'react';
import AppBar from '../components/AppBar';
import { FlatList, Text, LayoutAnimation, Pressable, View } from 'react-native';
import { dataHelper } from '../utils/dataUtils';
import { SCREEN_NAMES } from '../utils/constants';
import { useTheme } from '../contexts/themeContext';
import Card from '../components/Card';
import BottomSheetModal from '../components/BottomSheetModal';
import IconList from '../components/IconList';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import NoDataCard from '../components/NoDataCard';
import MaterialSlider from '../components/MaterialSlider';

const fontWeights = {
  brhknde: 600,
};
const LANGUAGE_MAPPER = {
  kn: 'Kannada',
  en: 'English',
};

const ReaderScreen = ({ route }) => {
  const { item } = route.params;
  const { theme, toggleTheme, showDarkSwitch, font, updateFont } = useTheme();

  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [readerData, setReaderData] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const listRef = useRef(null);

  const toTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // 🔹 Right icons (theme + toggle view)
  const rightIcons = useMemo(() => {
    const icons = [];
    icons.push({
      iconName: 'arrow-up-thick',
      onPress: toTop,
    });
    if (showDarkSwitch) {
      icons.push({ iconName: 'theme-light-dark', onPress: toggleTheme });
    }
    if (languages && languages.length > 1) {
      icons.push({
        iconName: 'translate',
        onPress: () => setShowLanguageModal(true),
      });
    }
    return icons;
  }, [showDarkSwitch, toggleTheme, languages]);

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
            const languages = Object.keys(fetchedData.translations);
            setLanguages(languages);
            const currentLanguage = languages[0];
            setCurrentLanguage(currentLanguage);
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
    if (item?.dataUrl) {
      fetchData();
    }
  }, [item]);

  // Update when switching language
  useEffect(() => {
    if (currentLanguage && fetchedData?.translations) {
      const nextData = fetchedData.translations[currentLanguage];
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setReaderData(nextData);
      setDisplayTitle(nextData.title);
    }
  }, [currentLanguage]);

  const renderItem = ({ item }) => {
    if (item.type === 'paragraph') {
      return (
        <Card key={item.id}>
          {item.lines.map((line, index) =>
            line?.trim() ? (
              <Text
                key={index}
                style={{
                  color: theme.colors.onSurface,
                  fontFamily: item?.fontFamily || 'NotoSerif',
                  fontWeight: fontWeights[item.fontFamily] || '700',
                  lineHeight:
                    item.fontFamily === 'brhknde'
                      ? parseInt(font) + 17
                      : parseInt(font) + 14,
                  fontSize: item.fontFamily === 'brhknde' ? font + 2 : font,
                }}
              >
                {line}
              </Text>
            ) : (
              <Text key={`gap-${index}`} style={{ height: 8 }} />
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
          <Text
            key={item.id}
            style={{
              color: theme.colors.onSurface,
              fontFamily: item?.fontFamily ? item?.fontFamily : 'NotoSans',
              fontSize: font + 2,
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            {item.title}
          </Text>
        </Card>
      );
    }
  };
  return (
    <>
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
        key={`${title}-${currentLanguage}`}
        ListEmptyComponent={<NoDataCard title="No content available" />}
      />

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
            subtitle={`Change language to ${LANGUAGE_MAPPER[language] || language}`}
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut,
              );
              setCurrentLanguage(language);
              setShowLanguageModal(false);
            }}
            rightContent={
              <>
                {currentLanguage === language ? (
                  <MaterialDesignIcons
                    name="check-decagram"
                    size={24}
                    color={theme.colors.primary}
                  />
                ) : (
                  <></>
                )}
              </>
            }
          />
        ))}
      </BottomSheetModal>
    </>
  );
};

export default ReaderScreen;
