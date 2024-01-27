/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {FlatList, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {ThemeContext} from '../providers/ThemeProvider';
const InlineList = props => {
  const {darkmode, textColor} = useContext(ThemeContext);

  const LItem = ({title, goto}) => (
    <View style={{height: 50}}>
      <TouchableRipple
        onPress={() => {
          props.nav.navigate(goto);
        }}
        rippleColor="rgba(0, 0, 0, .32)">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '98%',
            borderBottomColor: darkmode ? '#706f69' : '#eee',
            borderBottomWidth: 2,
            marginLeft: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: textColor,
              marginBottom: 5,
              fontWeight: '700',
            }}>
            {title}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
  const renderItem = ({item}) => (
    <LItem title={item.displayTitle} goto={item.goto} />
  );

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={item => item.title}
    />
  );
};

export default React.memo(InlineList);
