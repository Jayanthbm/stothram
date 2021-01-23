/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, Text, BackHandler, Alert, Pressable, Switch} from 'react-native';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import HIcon from 'react-native-vector-icons/Ionicons';
import {FlatGrid} from 'react-native-super-grid';
import Admob from '../Components/Admob';
import * as Adhelper from '../Constants/AdUnits';

import {ThemeContext} from '../providers/ThemeProvider';

const HomeScreen = ({navigation}) => {
  const {
    darkmode,
    toggleDarkMode,
    darkSwitch,
    backgroundColor,
    headerBackground,
  } = useContext(ThemeContext);
  let dataarray = [
    {
      id: 1,
      title: 'Stothram',
      goto: 'ShotramScreen',
      darkBackground: '#878683',
      lightBackground: '#1abc9c',
      icon: 'database',
    },
    {
      id: 2,
      title: 'Bhajanas',
      goto: 'BhajaneScreen',
      darkBackground: '#878683',
      lightBackground: '#3498db',
      icon: 'profile',
    },
  ];

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
    <Container style={{backgroundColor: backgroundColor}}>
      <Header style={{backgroundColor: headerBackground}}>
        <Left />
        <Body>
          <Title style={{color: darkmode ? '#fff' : '#bebebe'}}>
            Choose One
          </Title>
        </Body>
        <Right>
          <Pressable
            onPress={() => {
              navigation.navigate('SettingsScreen');
            }}>
            {({pressed}) => (
              <HIcon
                name={pressed ? 'settings-sharp' : 'settings-outline'}
                style={{
                  color: '#fff',
                  fontSize: 25,
                }}
              />
            )}
          </Pressable>
          {darkSwitch && (
            <Switch
              value={darkmode}
              onValueChange={toggleDarkMode}
              trackColor={{false: '#ccc', true: '#81b0ff'}}
              thumbColor={darkmode ? '#D5E650' : '#f4f3f4'}
              style={{marginLeft: 10}}
            />
          )}
        </Right>
      </Header>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          marginTop: 50,
        }}>
        {dataarray && dataarray != null && (
          <FlatGrid
            itemDimension={130}
            data={dataarray}
            spacing={15}
            renderItem={({item}) => <Item data={item} />}
          />
        )}
      </View>
      <Admob type={'banner'} unitId={Adhelper.GenerateId()} />
    </Container>
  );
};
export default HomeScreen;
