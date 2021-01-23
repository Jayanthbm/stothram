/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  TouchableWithoutFeedback,
  Pressable,
  Switch,
  ImageBackground,
  TextInput,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  List,
  ListItem,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
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
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(goto);
        }}>
        <View
          style={{
            justifyContent: 'flex-end',
            borderRadius: 5,
            padding: 10,
            height: 150,
            borderColor: 'grey',
          }}>
          <ImageBackground
            source={image}
            style={{
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'center',
              borderColor: textColor,
              borderWidth: 1,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              color: textColor,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {displayTitle ? displayTitle : title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

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
            <Title>Bhajanas</Title>
          </Body>
          <Right>
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
        <Pressable onPress={toggleViewType}>
          <View
            style={{
              alignContent: 'flex-end',
              flexDirection: 'row-reverse',
              alignItems: 'baseline',
              marginTop: 20,
            }}>
            <Icon
              name={viewType === 'card' ? 'database' : 'layout'}
              style={{
                color: textColor,
                fontSize: 25,
                marginRight: 10,
              }}
            />
            <Text style={{color: textColor, fontSize: 20, marginEnd: 5}}>
              Change View to
            </Text>
          </View>
        </Pressable>
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
            <Content>
              <List>
                {dataarray &&
                  dataarray != null &&
                  dataarray.map((item, index) => (
                    <ListItem
                      icon
                      onPress={() => {
                        navigation.navigate(item.goto);
                      }}
                      key={item.id}>
                      <Left />
                      <Body>
                        <Text style={{color: textColor, fontSize: 20}}>
                          {item.displayTitle}
                        </Text>
                      </Body>
                      <Right />
                    </ListItem>
                  ))}
              </List>
            </Content>
          )}
        </React.Fragment>

        <Admob type={'banner'} unitId={Adhelper.GenerateId()} />
      </View>
    </Container>
  );
};
export default BhajaneScreen;
