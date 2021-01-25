/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {View, BackHandler, TextInput} from 'react-native';
import {Container} from 'native-base';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import CardList from '../Components/CardList';
import InlineList from '../Components/InlineList';
import {BHAJANE_SCREEN_DATA} from '../Constants/data';

import {ThemeContext} from '../providers/ThemeProvider';

const BhajaneScreen = ({navigation}) => {
  const [searchvalue, onChangeText] = useState('');
  const [dataarray, setDataarray] = useState(BHAJANE_SCREEN_DATA);
  const {backgroundColor, textColor, viewType} = useContext(ThemeContext);

  const setDefaultData = () => {
    setDataarray(BHAJANE_SCREEN_DATA);
  };

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
        <HeaderComponent
          backAction={() => {
            navigation.navigate('HomeScreen');
          }}
          title={'Bhajanas'}
          viewType={true}
        />
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
            <CardList nav={navigation} data={dataarray} />
          ) : (
            <InlineList nav={navigation} data={dataarray} />
          )}
        </React.Fragment>

        <Admob />
      </View>
    </Container>
  );
};
export default BhajaneScreen;
