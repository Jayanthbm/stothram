// src/screens/ListScreen.js

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import AppBar from '../components/AppBar';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import NoDataCard from '../components/NoDataCard';
import { useTheme } from '../contexts/themeContext';
import { SCREEN_NAMES } from '../utils/constants';
import { dataHelper, preFetcher } from '../utils/dataUtils';
import IconList from '../components/IconList';

const { width } = Dimensions.get('window');

// 🔹 Fixed, consistent dimensions
const CARD_MARGIN = 12;
const GRID_CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
const GRID_CARD_HEIGHT = 130;

const ListScreen = ({ route }) => {
  const { type } = route.params;
  const { viewType, theme, toggleViewType, showDarkSwitch, toggleTheme } =
    useTheme();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [dataUrl, setDataUrl] = useState(null);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [rendered, setRendered] = useState(false);

  // 🔹 Right icons (theme + toggle view)
  const rightIcons = useMemo(() => {
    const icons = [];
    if (showDarkSwitch) {
      icons.push({ iconName: 'theme-light-dark', onPress: toggleTheme });
    }
    icons.push({
      iconName: viewType === 'list' ? 'view-grid' : 'view-list',
      onPress: () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        toggleViewType();
      },
    });
    return icons;
  }, [showDarkSwitch, toggleTheme, viewType, toggleViewType]);

  // 🔹 Set title and URL
  useEffect(() => {
    if (type) {
      setTitle(type?.title || '');
      setDataUrl(type?.dataUrl || null);
    }
  }, [type]);

  // 🔹 Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await dataHelper(
        title,
        dataUrl,
        SCREEN_NAMES.LIST_SCREEN,
      );
      if (fetchedData?.data) {
        setList(fetchedData.data);
        preFetcher(fetchedData.data, SCREEN_NAMES.READER_SCREEN);
      }
    };
    if (dataUrl) fetchData();
  }, [dataUrl]);

  // 🔹 Search filter
  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return list;
    return list.filter(item =>
      item?.title?.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [list, searchValue]);

  const handleSearch = text => {
    setSearchValue(text);
    setRendered(true);
  };

  const handleItemClick = useCallback(
    item => navigation.navigate('Reader', { item }),
    [navigation],
  );

  // 🔹 Render each item (switches between IconList and Card)
  const renderItem = ({ item }) =>
    viewType === 'list' ? (
      <IconList
        key={item.id}
        leftIcon="note-text"
        title={item.title}
        onPress={() => handleItemClick(item)}
      />
    ) : (
      <Card
        key={item.id}
        onPress={() => handleItemClick(item)}
        style={{
          width: GRID_CARD_WIDTH,
          height: GRID_CARD_HEIGHT,
        }}
      >
        <View style={styles.cardGridContent}>
          <MaterialDesignIcons
            name="note-text"
            size={60}
            color={theme.colors.primary}
          />
          <Text
            style={[styles.gridTitle, { color: theme.colors.onSurface }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
        </View>
      </Card>
    );
  return (
    <>
      <AppBar title={title} rightIcons={rightIcons} />
      <View style={styles.searchWrapper}>
        <SearchBar
          placeholder={`Search ${title}`}
          value={searchValue}
          onChangeText={handleSearch}
          onClear={() => setSearchValue('')}
          disabled={false}
        />
      </View>
      {rendered && filteredData.length === 0 && (
        <NoDataCard
          title={`No data found in ${title}`}
          onActionPress={() => {
            setSearchValue('');
            handleSearch('');
          }}
        />
      )}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) =>
          item.id?.toString() || `${item.title}-${index}`
        }
        numColumns={viewType === 'list' ? 1 : 2}
        renderItem={renderItem}
        columnWrapperStyle={viewType === 'list' ? null : styles.gridRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        key={viewType}
        removeClippedSubviews
        initialNumToRender={10}
        windowSize={5}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: CARD_MARGIN * 2,
  },

  // Grid mode styles only
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },

  cardGridContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridTitle: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
  },

  // Common
  searchWrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default ListScreen;
