/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import {Appbar} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import Admob from '../Components/Admob';
import DarkToggle from '../Components/DarkToggle';

import {HOME_SCREEN_DATA} from '../Constants/data';

import {ThemeContext} from '../providers/ThemeProvider';

import {Badge} from 'react-native-paper';

const HomeScreen = ({navigation}) => {
  const {darkmode, backgroundColor, headerBackground} =
    useContext(ThemeContext);

  function Item({data}) {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(data.goto);
        }}>
        {({pressed}) => (
          <View
            style={{
              backgroundColor: darkmode
                ? data.darkBackground
                : data.lightBackground,
              justifyContent: 'flex-end',
              borderRadius: 5,
              padding: 10,
              height: 150,
            }}>
            <Badge
              size={25}
              style={{
                backgroundColor: darkmode ? '#f8f9fa' : '#ffc107',
                color: '#212529',
                fontWeight: 'bold',
              }}>
              {data.total}
            </Badge>
            <Icon
              name={data.icon}
              style={{
                marginEnd: 6,
                color: pressed ? (darkmode ? backgroundColor : '#000') : '#fff',
                fontSize: 80,
                fontWeight: '600',
                textAlign: 'center',
              }}
            />
            <Text
              style={{
                fontSize: 20,
                color: pressed ? (darkmode ? backgroundColor : '#000') : '#fff',
                fontWeight: '600',
                textAlign: 'center',
              }}>
              {data.title}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }

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

  return (
    <View style={{backgroundColor: backgroundColor, flex: 1}}>
      <Appbar.Header
        style={{
          backgroundColor: headerBackground,
        }}>
        <Appbar.Content
          title="Choose One"
          titleStyle={{
            color: '#fff',
          }}
        />
        <Appbar.Action
          icon={'cog-outline'}
          iconColor={'#fff'}
          onPress={() => {
            navigation.navigate('SettingsScreen');
          }}
        />
        <DarkToggle />
      </Appbar.Header>
      <ScrollView />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        {HOME_SCREEN_DATA && HOME_SCREEN_DATA != null && (
          <FlatGrid
            itemDimension={130}
            data={HOME_SCREEN_DATA}
            spacing={15}
            renderItem={({item}) => <Item data={item} />}
          />
        )}
      </View>
      <Admob />
    </View>
  );
};
export default HomeScreen;
