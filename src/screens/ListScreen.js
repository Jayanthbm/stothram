// src/screens/ListScreen.js
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
  Dimensions,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import NoDataCard from '../components/NoDataCard';
import { useTheme } from '../contexts/themeContext';
import { SCREEN_NAMES } from '../utils/constants';
import { dataHelper, preFetcher } from '../utils/dataUtils';
import IconList from '../components/IconList';
import ScrolltoTopIcon from '../components/ScrolltoTopIcon';
import MyText from '../components/MyText';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const GRID_CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
const GRID_CARD_HEIGHT = 130;

const ListScreen = ({ route }) => {
  const { type } = route.params;
  const { viewType, theme, toggleViewType, showDarkSwitch, toggleTheme } =
    useTheme();
  const navigation = useNavigation();
  const listRef = useRef(null);

  const [title, setTitle] = useState('');
  const [dataUrl, setDataUrl] = useState(null);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [rendered, setRendered] = useState(false);
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  // 🎞️ Animations: fade + slide
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current; // start slightly below

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
      try {
        const fetchedData = await dataHelper(title, dataUrl, SCREEN_NAMES.LIST);
        if (fetchedData?.data) {
          setList(fetchedData.data);
          preFetcher(fetchedData.data, SCREEN_NAMES.READER);
        }
      } catch (error) {
        console.error('Error loading list:', error);
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
    item => navigation.navigate('Reader', { item, type: type }),
    [navigation],
  );

  const renderItem = ({ item }) =>
    viewType === 'list' ? (
      <IconList
        leftIcon="note-text"
        title={item.title}
        onPress={() => handleItemClick(item)}
      />
    ) : (
      <Card
        onPress={() => handleItemClick(item)}
        style={{ width: GRID_CARD_WIDTH, height: GRID_CARD_HEIGHT }}
      >
        <View style={styles.cardGridContent}>
          <MaterialDesignIcons
            name="note-text"
            size={60}
            color={theme.colors.primary}
          />
          <MyText style={styles.gridTitle}>{item.title}</MyText>
        </View>
      </Card>
    );

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

  // ✅ Scroll listener to show/hide button with animation
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

  // ✅ Scroll to top function
  const scrollToTop = () => {
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

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppBar title={title} rightIcons={rightIcons} />

      <View style={styles.searchWrapper}>
        <SearchBar
          placeholder={`Search ${title}`}
          value={searchValue}
          onChangeText={handleSearch}
          onClear={() => setSearchValue('')}
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
        ref={listRef}
        data={filteredData}
        keyExtractor={(item, index) => `${item.id ?? item.title}-${index}`}
        numColumns={viewType === 'list' ? 1 : 2}
        renderItem={renderItem}
        columnWrapperStyle={viewType === 'list' ? null : styles.gridRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        key={viewType}
        removeClippedSubviews={false}
        initialNumToRender={10}
        windowSize={5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {/* 🧭 Scroll to Top Button with Fade + Slide */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <ScrolltoTopIcon
          visible={showScrollIcon}
          onPress={scrollToTop}
          align={viewType === 'list' ? 'right' : 'center'}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: CARD_MARGIN,
    paddingBottom: CARD_MARGIN * 2,
  },
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
  searchWrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default ListScreen;
