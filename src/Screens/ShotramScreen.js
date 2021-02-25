/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Searchbar, List} from 'react-native-paper';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import CardList from '../Components/CardList';
import InlineList from '../Components/InlineList';
import {SHOTRAM_SCREEN_DATA} from '../Constants/data';
import {ThemeContext} from '../providers/ThemeProvider';

const ShotramScreen = ({navigation}) => {
  const [searchvalue, onChangeText] = useState('');
  const [dataarray, setDataarray] = useState(SHOTRAM_SCREEN_DATA);
  const {backgroundColor, textColor, viewType} = useContext(ThemeContext);

  const setDefaultData = () => {
    setDataarray(SHOTRAM_SCREEN_DATA);
  };

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
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <HeaderComponent
        navigation={navigation}
        back={'HomeScreen'}
        title={'Stothram'}
        viewType={true}
      />
      <Searchbar
        placeholder="Search"
        placeholderTextColor={textColor}
        onChangeText={(text) => {
          onChangeText(text);
          searchFilterFunction(text);
        }}
        value={searchvalue}
        style={{backgroundColor: backgroundColor}}
        inputStyle={{color: textColor}}
        iconColor={textColor}
      />
      {dataarray.length < 1 ? (
        <ScrollView>
          <List.Item
            title="No Results Found, Try changing keyword"
            titleStyle={{color: textColor}}
          />
        </ScrollView>
      ) : (
        <React.Fragment>
          {viewType === 'card' ? (
            <CardList nav={navigation} data={dataarray} />
          ) : (
            <View style={{flex: 1, marginTop: 15}}>
              <InlineList nav={navigation} data={dataarray} />
            </View>
          )}
        </React.Fragment>
      )}
      <Admob />
    </View>
  );
};
export default ShotramScreen;
