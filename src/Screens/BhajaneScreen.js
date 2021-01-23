/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  Pressable,
  Switch,
  ImageBackground,
  TextInput,
  Animated,
  FlatList,
} from 'react-native';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import HIcon from 'react-native-vector-icons/Ionicons';
import {FlatGrid} from 'react-native-super-grid';
import Admob from '../Components/Admob';
import * as Adhelper from '../Constants/AdUnits';

import {ThemeContext} from '../providers/ThemeProvider';

const BhajaneScreen = ({navigation}) => {
  const [searchvalue, onChangeText] = useState('');
  const [dataarray, setDataarray] = useState(null);
  const {
    darkmode,
    toggleDarkMode,
    darkSwitch,
    backgroundColor,
    textColor,
    headerBackground,
    viewType,
    toggleViewType,
  } = useContext(ThemeContext);

  const setDefaultData = () => {
    setDataarray([
      {
        id: 1,
        title: 'BhajaYatirajam',
        displayTitle: 'ಭಜ ಯತಿರಾಜಂ',
        goto: 'BhajaYatirajam',
      },
      {
        id: 2,
        title: 'Thugire Rangana Thugire Krishnana',
        goto: 'ThugireRangana',
        displayTitle: 'ತೂಗಿರೆ ರಂಗನ',
      },
      {
        id: 3,
        title: 'Hanuman Chalisa',
        goto: 'HanumanChalisa',
        displayTitle: 'ಹನುಮಾನ್ ಚಾಲಿಸಾ',
      },
      {
        id: 4,
        title: 'Hare Krishna Mantram',
        goto: 'HareKrishnaMantram',
        displayTitle: 'ಹರೇ ಕೃಷ್ಣ ಮಂತ್ರಂ',
      },
      {
        id: 5,
        title: 'ShuddaBrahma',
        goto: 'ShuddaBrahma',
        displayTitle: 'ಶುದ್ಧಬ್ರಹ್ಮ',
      },
      {
        id: 6,
        title: 'Sreenivasa Neene Paliso',
        goto: 'SreenivasaNeenePaliso',
        displayTitle: 'ಶ್ರೀನಿವಾಸ ನೀನೇ',
      },
      {
        id: 7,
        title: 'Dheera Maruthi Gambeera Maruthi',
        goto: 'DheeraMaruthi',
        displayTitle: 'ಧೀರ ಮಾರುತಿ',
      },
      {
        id: 8,
        title: 'KodandaRama',
        goto: 'KodandaRama',
        displayTitle: 'ಕೋದಂಡರಾಮ',
      },
      {
        id: 9,
        title: 'SriramChandirane',
        goto: 'SriramChandirane',
        displayTitle: 'ಶ್ರೀ ರಾಮಚಂದಿರನೆ',
      },
    ]);
  };

  function Item({title, goto, displayTitle}) {
    let image = require('../Assets/Images/god.webp');
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(goto);
        }}>
        {({pressed}) => (
          <React.Fragment>
            <ImageBackground
              source={image}
              style={{
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
                borderColor: textColor,
                borderWidth: 1,
                height: 100,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                color: pressed ? headerBackground : textColor,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              {displayTitle ? displayTitle : title}
            </Text>
          </React.Fragment>
        )}
      </Pressable>
    );
  }

  const LItem = ({title, goto}) => (
    <Pressable
      onPress={() => {
        navigation.navigate(goto);
      }}>
      {({pressed}) => (
        <Animated.View style={{height: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '98%',
              borderBottomColor: darkmode ? headerBackground : '#eee',
              borderBottomWidth: 2,
              marginLeft: 20,
              backgroundColor: pressed ? headerBackground : backgroundColor,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: pressed ? '#fff' : textColor,
                marginBottom: 5,
              }}>
              {title}
            </Text>
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
  const renderItem = ({item}) => (
    <LItem title={item.displayTitle} goto={item.goto} />
  );
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('HomeScreen');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    setDefaultData();
    return () => backHandler.remove();
  }, [navigation]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = dataarray.filter((item) => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataarray(newData);
    } else {
      setDefaultData();
    }
  };

  return (
    <Container style={{backgroundColor: backgroundColor}}>
      <View style={{flex: 1, backgroundColor: backgroundColor}}>
        <Header style={{backgroundColor: headerBackground}}>
          <Left>
            <Pressable
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}
              style={{marginLeft: 10}}>
              {({pressed}) => (
                <HIcon
                  name={
                    pressed
                      ? 'chevron-back-circle-sharp'
                      : 'chevron-back-circle-outline'
                  }
                  style={{
                    color: '#fff',
                    fontSize: 30,
                  }}
                />
              )}
            </Pressable>
          </Left>
          <Body>
            <Title style={{color: darkmode ? '#fff' : '#bebebe'}}>
              Bhajanas
            </Title>
          </Body>
          <Right>
            <Pressable onPress={toggleViewType}>
              {({pressed}) => (
                <HIcon
                  name={
                    viewType === 'card'
                      ? pressed
                        ? 'list-circle-sharp'
                        : 'list-circle-outline'
                      : pressed
                      ? 'card-sharp'
                      : 'card-outline'
                  }
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
        <TextInput
          placeholder="Search"
          placeholderTextColor={textColor}
          value={searchvalue}
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            marginStart: 20,
            marginEnd: 20,
            fontSize: 15,
            color: textColor,
          }}
          textAlign={'center'}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          onChangeText={(text) => {
            onChangeText(text);
            searchFilterFunction(text);
          }}
        />
        <React.Fragment>
          {viewType === 'card' ? (
            <React.Fragment>
              {dataarray && dataarray != null && (
                <FlatGrid
                  itemDimension={130}
                  data={dataarray}
                  style={{
                    marginTop: 10,
                    flex: 1,
                  }}
                  spacing={10}
                  renderItem={({item}) => (
                    <Item
                      title={item.title}
                      goto={item.goto}
                      displayTitle={item.displayTitle}
                    />
                  )}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {dataarray && (
                <FlatList
                  data={dataarray}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.title}
                />
              )}
            </React.Fragment>
          )}
        </React.Fragment>

        <Admob type={'banner'} unitId={Adhelper.GenerateId()} />
      </View>
    </Container>
  );
};
export default BhajaneScreen;
