// src/screens/HomeScreen.js

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  BackHandler,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/themeContext';
import AppBar from '../components/AppBar';
import Card from '../components/Card';
import AntDesign from '@react-native-vector-icons/ant-design';
import { CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES } from '../utils/constants';
import { dataHelper, preFetcher } from '../utils/dataUtils';
import BottomSheetModal from '../components/BottomSheetModal';
import IconList from '../components/IconList';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;
const CARD_HEIGHT = 130;

const HomeScreen = () => {
  const { theme, toggleTheme, showDarkSwitch } = useTheme();
  const navigation = useNavigation();
  const [types, setTypes] = useState([]);
  const [showExitModal, setShowExitModal] = useState(false);

  // 🔹 Right icons (theme + toggle view)
  const rightIcons = useMemo(() => {
    const icons = [];
    if (showDarkSwitch) {
      icons.push({ iconName: 'theme-light-dark', onPress: toggleTheme });
    }
    icons.push({
      iconName: 'cog',
      onPress: () => navigation.navigate(SCREEN_NAMES.SETTINGS),
    });
    return icons;
  }, [showDarkSwitch, toggleTheme, navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await dataHelper(
          CACHED_DATA_KEYS.HOME,
          DATA_URLS.HOME,
          SCREEN_NAMES.HOME,
        );
        if (fetchedData) {
          setTypes(fetchedData?.data || []);
          preFetcher(fetchedData?.data, SCREEN_NAMES.LIST);
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTypePress = useCallback(
    type => {
      navigation.navigate(SCREEN_NAMES.LIST, { type, title: type.title });
    },
    [navigation],
  );

  const renderItem = ({ item, index }) => {
    const isLastOdd = types.length % 2 !== 0 && index === types.length - 1;
    const ICON_SIZE = Math.min(CARD_WIDTH * 0.5, 60);

    return (
      <Card
        accessibilityRole="button"
        accessibilityLabel={item.title}
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
          <Text
            style={[
              styles.title,
              { color: theme.colors.onSurface, fontFamily: 'NotoSans' },
            ]}
          >
            {item.title}
          </Text>
        </View>
      </Card>
    );
  };

  // ✅ Handle hardware back only when screen focused
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setShowExitModal(true);
        return true;
      };
      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => sub.remove();
    }, []),
  );
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AppBar showBack={false} rightIcons={rightIcons} title="Stothram" />

      <View style={styles.flexWrapper}>
        <View style={styles.bottomAlign}>
          <FlatList
            data={types}
            keyExtractor={(item, index) =>
              item.id?.toString() || `key-${index}`
            }
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            initialNumToRender={6}
            windowSize={10}
            accessibilityLabel="Stothram category list"
            accessible
          />
        </View>
      </View>
      <BottomSheetModal
        title={'Do you want to exit?'}
        visible={showExitModal}
        closeModal={() => setShowExitModal(false)}
      >
        <IconList
          keyName="exit-yes"
          leftIcon="exit-to-app"
          title="Yes, Exit"
          subtitle="Close the Stothram app"
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setShowExitModal(false);
            setTimeout(() => BackHandler.exitApp(), 180);
          }}
          rightContent={
            <MaterialDesignIcons
              name="check-decagram"
              size={24}
              color={theme.colors.primary}
            />
          }
        />
        <IconList
          keyName="exit-cancel"
          leftIcon="close-circle-outline"
          title="No, Stay"
          subtitle="Stay on the Home screen"
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setShowExitModal(false);
          }}
          rightContent={
            <MaterialDesignIcons
              name="close"
              size={22}
              color={theme.colors.onSurfaceVariant}
            />
          }
        />
      </BottomSheetModal>
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
  listContent: { paddingHorizontal: CARD_MARGIN, paddingBottom: 60 },
  row: {
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
  bottomAlign: {
    alignSelf: 'center',
    width: '100%',
    marginBottom: 20,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'NotoSans',
  },
});

export default HomeScreen;
