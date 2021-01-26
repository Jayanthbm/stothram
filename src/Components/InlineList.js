/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {FlatList, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {ThemeContext} from '../providers/ThemeProvider';
const InlineList = (props) => {
  const {darkmode, textColor, headerBackground} = useContext(ThemeContext);

  const LItem = ({title, goto}) => (
    <TouchableRipple
      onPress={() => {
        props.nav.navigate(goto);
      }}
      rippleColor="rgba(0, 0, 0, .32)">
      <View style={{height: 40}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '98%',
            borderBottomColor: darkmode ? headerBackground : '#eee',
            borderBottomWidth: 2,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: textColor,
              marginBottom: 5,
            }}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
  const renderItem = ({item}) => (
    <LItem title={item.displayTitle} goto={item.goto} />
  );

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.title}
    />
  );
};

export default React.memo(InlineList);
