/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, ImageBackground, TouchableOpacity} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {ThemeContext} from '../providers/ThemeProvider';

const CardList = (props) => {
  const {textColor} = useContext(ThemeContext);

  function Item({title, goto, displayTitle}) {
    let image = require('../Assets/Images/god.webp');
    return (
      <TouchableOpacity
        onPress={() => {
          props.nav.navigate(goto);
        }}>
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
              color: textColor,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {displayTitle ? displayTitle : title}
          </Text>
        </React.Fragment>
      </TouchableOpacity>
    );
  }
  return (
    <FlatGrid
      itemDimension={130}
      data={props.data}
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
  );
};

export default React.memo(CardList);
