/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext} from 'react';
import {View, BackHandler, Pressable, Switch} from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  ListItem,
  List,
  Text,
  Thumbnail,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';

import Admob from '../Components/Admob';
import * as Adhelper from '../Constants/AdUnits';

import {ThemeContext} from '../providers/ThemeProvider';

const jayanth = require('../Assets/Images/jayanth.webp');
const yoga = require('../Assets/Images/yoga.webp');

const SettingsScreen = ({navigation}) => {
  const {
    darkmode,
    toggleDarkMode,
    darkSwitch,
    backgroundColor,
    textColor,
    headerBackground,
    toggleDarkSwitch,
  } = useContext(ThemeContext);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <Container>
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <Header style={{backgroundColor: headerBackground}}>
          <Left>
            <Pressable
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}>
              <Icon
                name={'left'}
                style={{
                  color: '#fff',
                  fontSize: 25,
                }}
              />
            </Pressable>
          </Left>
          <Body>
            <Title> Settings </Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem itemDivider style={{backgroundColor: backgroundColor}}>
              <Text style={{color: textColor, fontSize: 25}}>
                {' '}
                General Settings
              </Text>
            </ListItem>
            <ListItem avatar onPress={toggleDarkMode}>
              <Left />
              <Body>
                <Text style={{color: textColor}}>Dark theme</Text>
                <Text note style={{color: textColor}}>
                  Reduce glare and improve night viewing
                </Text>
              </Body>
              <Right>
                <Switch
                  value={darkmode}
                  onValueChange={toggleDarkMode}
                  trackColor={{false: '#ccc', true: '#81b0ff'}}
                  thumbColor={darkmode ? '#5098E6' : '#f4f3f4'}
                />
              </Right>
            </ListItem>
            <ListItem avatar onPress={toggleDarkSwitch}>
              <Left />
              <Body>
                <Text style={{color: textColor}}>Toggle in Every Page</Text>
                <Text note style={{color: textColor}}>
                  Show toggle dark mode switch in every page
                </Text>
              </Body>
              <Right>
                <Switch
                  value={darkSwitch}
                  onValueChange={toggleDarkSwitch}
                  trackColor={{false: '#ccc', true: '#81b0ff'}}
                  thumbColor={darkmode ? '#5098E6' : '#f4f3f4'}
                />
              </Right>
            </ListItem>
            <ListItem itemDivider style={{backgroundColor: backgroundColor}}>
              <Text style={{color: textColor, fontSize: 25}}> Created By</Text>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={jayanth} />
              </Left>
              <Body>
                <Text style={{color: textColor}}>Jayanthbharadwaj M</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={yoga} />
              </Left>
              <Body>
                <Text style={{color: textColor}}>Yoga</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 4}}>
          <Text style={{color: textColor, fontSize: 20}}>Made With {''}</Text>
          <Icon
            name={'heart'}
            style={{
              color: 'red',
              fontSize: 25,
            }}
          />
          <Text style={{color: textColor, fontSize: 20}}> In India</Text>
        </View>
        <Admob type={'banner'} unitId={Adhelper.GenerateId()} />
      </View>
    </Container>
  );
};

export default SettingsScreen;
