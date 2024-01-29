import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Admob from '../components/Admob';
import {ThemeContext} from '../contexts/themeContext';
import {
  compareTimeDifference,
  getItemFromStorage,
  setItemInStorage,
} from '../utils/asyncStorageUtils';
const CACHE_KEY = 'cachedTypes';
const FETCH_THRESHOLD = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds
const HomeScreen = ({navigation}) => {
  const {darkmode, backgroundColor, headerBackground} =
    useContext(ThemeContext);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypesFromLocalStorage = async () => {
      try {
        const cachedTypes = await getItemFromStorage(CACHE_KEY);
        const lastFetchTime = await getItemFromStorage(
          `${CACHE_KEY}_lastFetchTime`,
        );

        if (cachedTypes) {
          console.log('fetching from cache');
          setTypes(JSON.parse(cachedTypes));

          // Check if it's time to fetch from online
          const currentTime = new Date().getTime();
          const shouldFetchFromOnline = compareTimeDifference(
            currentTime,
            lastFetchTime,
            FETCH_THRESHOLD,
          );

          if (!lastFetchTime || shouldFetchFromOnline) {
            fetchTypesFromOnline();
          }
        } else {
          // If no cached version, fetch from online
          fetchTypesFromOnline();
        }
      } catch (error) {
        console.error('Error fetching cached types:', error);
      }
    };

    const fetchTypesFromOnline = async () => {
      try {
        console.log('fetching from online');
        const response = await fetch(
          'https://jayanthbm.github.io/stothram-data/home-screen-data.json',
        );
        const data = await response.json();

        // Update local storage with the new data and timestamp
        await setItemInStorage(CACHE_KEY, JSON.stringify(data?.data));
        await setItemInStorage(
          `${CACHE_KEY}_lastFetchTime`,
          new Date().getTime().toString(),
        );
        // Update state with the new data
        setTypes(data?.data);
      } catch (error) {
        console.error('Error fetching types from online:', error);
      }
    };

    // Fetch from local storage
    fetchTypesFromLocalStorage();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Choose One',
      headerStyle: {
        backgroundColor: headerBackground,
      },
      headerTintColor: '#fff',
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesomeIcon name="rupee" size={24} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <AntDesignIcon name="setting" size={24} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to Exit Stothram?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const handleTypePress = type => {
    navigation.navigate('List', {type});
  };

  const renderTypeItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleTypePress(item)}
      style={[
        styles.typeContainer,
        {borderColor: darkmode ? item.darkBackground : item.lightBackground},
      ]}>
      <View
        style={[
          styles.typeItem,
          {
            backgroundColor: darkmode
              ? item.darkBackground
              : item.lightBackground,
          },
        ]}>
        <View style={styles.iconContainer}>
          <AntDesignIcon name={item.icon} size={60} style={styles.typeIcon} />
          <Text style={styles.typeTitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <FlatList
        data={types}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTypeItem}
        numColumns={2}
      />
      <Admob />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
  headerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerIcon: {
    marginRight: 20,
    color: '#fff',
  },
  typeContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  typeItem: {
    padding: 20,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIcon: {
    color: '#fff',
    marginBottom: 10,
  },
  typeTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
