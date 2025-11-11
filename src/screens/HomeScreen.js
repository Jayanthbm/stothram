// src/screens/HomeScreen.js

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/themeContext';
import AppBar from '../components/AppBar';
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native';
import { CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES } from '../utils/constants';
import { dataHelper, preFetcher } from '../utils/dataUtils';
import AntDesign from '@react-native-vector-icons/ant-design';
import Card from '../components/Card';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2; // 2 per row
const CARD_HEIGHT = 130; // ✅ fixed height for uniformity

const HomeScreen = () => {
  const { theme, toggleTheme, showDarkSwitch } = useTheme();
  const navigation = useNavigation();
  const [types, setTypes] = useState([]);

  // 🔹 Right icons (theme + toggle view)
  const rightIcons = useMemo(() => {
    const icons = [];
    if (showDarkSwitch) {
      icons.push({ iconName: 'theme-light-dark', onPress: toggleTheme });
    }
    icons.push({
      iconName: 'cog',
      onPress: () => navigation.navigate('Settings'),
    });
    return icons;
  }, [showDarkSwitch, toggleTheme, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          CACHED_DATA_KEYS.HOME_SCREEN,
          DATA_URLS.HOME_SCREEN,
          SCREEN_NAMES.HOME_SCREEN,
        );
        if (fetchedData) {
          setTypes(fetchedData?.data || []);
          preFetcher(fetchedData?.data, SCREEN_NAMES.LIST_SCREEN);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTypePress = useCallback(
    type => {
      navigation.navigate('List', { type, title: type.title });
    },
    [navigation],
  );

  const renderItem = ({ item, index }) => {
    const isLastOdd = types.length % 2 !== 0 && index === types.length - 1; // last single card full width

    return (
      <Card
        style={{
          width: isLastOdd ? width - CARD_MARGIN * 2 : CARD_WIDTH,
          height: CARD_HEIGHT,
        }}
        onPress={() => handleTypePress(item)}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AntDesign name={item.icon} size={60} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>
            {item.title}
          </Text>
        </View>
      </Card>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar showBack={false} rightIcons={rightIcons} title="Stothram" />

      <View style={styles.flexWrapper}>
        <View style={styles.bottomAlign}>
          <FlatList
            data={types}
            keyExtractor={item => item.id?.toString()}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomAlign: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: CARD_MARGIN,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  title: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default HomeScreen;
