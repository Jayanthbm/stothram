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
import Admob from '../components/admob';
import {ThemeContext} from '../contexts/themeContext';

import CustomHeaderRight from '../components/headerRight';
import {CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES} from '../constants';
import {commonNavigationOptions} from '../navigationOptions';
import {dataHelper} from '../utils/dataUtils';

const HomeScreen = ({navigation}) => {
  const {darkmode, backgroundColor, headerBackground} =
    useContext(ThemeContext);

  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await dataHelper(
        CACHED_DATA_KEYS.HOME_SCREEN,
        DATA_URLS.HOME_SCREEN,
        SCREEN_NAMES.HOME_SCREEN,
      );
      if (fetchedData) {
        setTypes(fetchedData?.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Stothram',
      ...commonNavigationOptions(headerBackground),
      headerRight: () => (
        <CustomHeaderRight navigation={navigation} showSettings={true} />
      ),
    });
  }, [navigation, headerBackground]);

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
        style={{
          marginTop: 25,
        }}
      />
      <Admob />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 1,
    marginRight: 1,
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
