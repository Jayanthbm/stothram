/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  BackHandler,
  Alert,
  TouchableWithoutFeedback,
  Pressable,
  Switch,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
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
      code: '#1abc9c',
      text: '#fff',
      icon: 'database',
    },
    {
      id: 2,
      title: 'Bhajanas',
      goto: 'BhajaneScreen',
      code: '#3498db',
      text: '#fff',
      icon: 'profile',
    },
  ];

  function Item({title, goto, code, text, icon}) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(goto);
        }}>
        <View
          style={{
            backgroundColor: code,
            justifyContent: 'flex-end',
            borderRadius: 10,
            padding: 10,
            height: 150,
          }}>
          <Icon
            name={icon}
            style={{
              marginEnd: 6,
              color: '#fff',
              fontSize: 80,
              fontWeight: '600',
              textAlign: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: text,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
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
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <Header style={{backgroundColor: headerBackground}}>
          <Left />
          <Body>
            <Title> Choose One</Title>
          </Body>
          <Right>
            <Pressable
              onPress={() => {
                navigation.navigate('SettingsScreen');
              }}>
              <Icon
                name={'setting'}
                style={{
                  color: '#fff',
                  fontSize: 25,
                }}
              />
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

        <View style={{marginTop: 20}}>
          {dataarray && dataarray != null && (
            <FlatGrid
              itemDimension={130}
              data={dataarray}
              spacing={15}
              renderItem={({item}) => (
                <Item
                  title={item.title}
                  goto={item.goto}
                  code={item.code}
                  text={item.text}
                  icon={item.icon}
                />
              )}
            />
          )}
        </View>
        <Content />
        <Admob type={'banner'} unitId={Adhelper.GenerateId()} />
      </View>
    </Container>
  );
};
export default HomeScreen;
