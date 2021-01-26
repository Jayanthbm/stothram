/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, Text, BackHandler, Alert, Pressable} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import {FlatGrid} from 'react-native-super-grid';
import {Appbar} from 'react-native-paper';
import Admob from '../Components/Admob';
import DarkToggle from '../Components/DarkToggle';

import {HOME_SCREEN_DATA} from '../Constants/data';

import {ThemeContext} from '../providers/ThemeProvider';

const HomeScreen = ({navigation}) => {
  const {darkmode, backgroundColor, headerBackground} = useContext(
    ThemeContext,
  );

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
            <Icon
              name={data.icon}
              style={{
                marginEnd: 6,
                color: pressed ? '#000' : '#fff',
                fontSize: 80,
                fontWeight: '600',
                textAlign: 'center',
              }}
            />
            <Text
              style={{
                fontSize: 20,
                color: pressed ? '#000' : '#fff',
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
        style={{backgroundColor: headerBackground, height: 50}}
        dark={true}>
        <Appbar.Content title="Choose One" />
        <Appbar.Action
          icon={'cog-outline'}
          onPress={() => {
            navigation.navigate('SettingsScreen');
          }}
        />
        <DarkToggle />
      </Appbar.Header>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          marginTop: 50,
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
