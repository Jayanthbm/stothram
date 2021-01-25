/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, FlatList, TouchableOpacity, View} from 'react-native';
import {ThemeContext} from '../providers/ThemeProvider';
const InlineList = (props) => {
  const {darkmode, textColor, headerBackground} = useContext(ThemeContext);

  const LItem = ({title, goto}) => (
    <TouchableOpacity
      onPress={() => {
        props.nav.navigate(goto);
      }}>
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
    </TouchableOpacity>
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
