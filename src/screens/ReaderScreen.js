// src/screens/ReaderScreen.js

import React, { useEffect, useMemo, useState } from 'react';
import AppBar from '../components/AppBar';
import { FlatList, Text } from 'react-native';
import { dataHelper } from '../utils/dataUtils';
import { SCREEN_NAMES } from '../utils/constants';
import { useTheme } from '../contexts/themeContext';
import Card from '../components/Card';

const fontWeights = {
  brhknde: 600,
};

const ReaderScreen = ({ route }) => {
  const { item } = route.params;
  const { theme, toggleTheme, showDarkSwitch, font, setFont } = useTheme();

  const [title, setTitle] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [readerData, setReaderData] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

 // 🔹 Right icons (theme + toggle view)
  const rightIcons = useMemo(() => {
    const icons = [];
    if (showDarkSwitch) {
      icons.push({ iconName: 'theme-light-dark', onPress: toggleTheme });
    }
    return icons;
  }, [showDarkSwitch, toggleTheme]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          item?.title,
          item?.dataUrl,
          SCREEN_NAMES.READER_SCREEN,
        );
        if (fetchedData) {
          console.log('fetchedData', fetchedData);
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

  useEffect(() => {
    if (currentLanguage && fetchedData.translations !== undefined) {
      setReaderData(fetchedData['translations'][currentLanguage]);
      setDisplayTitle(fetchedData['translations'][currentLanguage].title);
    }
  }, [currentLanguage]);

  const renderItem = ({ item }) => {
    if (item.type === 'paragraph') {
      return (
        <Card key={item.id} disabled>
          {item.lines.map((line, index) => (
            <Text
              key={index}
              style={{
                color: theme.colors.onSurface,
                fontFamily: item?.fontFamily ? item?.fontFamily : 'NotoSerif',
                fontWeight: fontWeights[item.fontFamily]
                  ? fontWeights[item.fontFamily]
                  : '700',
                lineHeight:
                  item.fontFamily === 'brhknde'
                    ? parseInt(font) + 17
                    : parseInt(font) + 14,
                fontSize: item.fontFamily === 'brhknde' ? font + 2 : font,
              }}
            >
              {line}
            </Text>
          ))}
        </Card>
      );
    } else if (item.type === 'subheading') {
      return (
        <Card
          disabled
          key={item.id}
          style={{
            backgroundColor: theme.colors.activeIndicator,
          }}
        >
          <Text
            key={item.id}
            style={{
              color: theme.colors.onSurface,
              fontFamily: item?.fontFamily ? item?.fontFamily : 'NotoSans',
              fontSize: 20,
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
      <FlatList
        data={readerData?.content}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={10}
        windowSize={5}
        key={title}
      />
    </>
  );
};

export default ReaderScreen;
