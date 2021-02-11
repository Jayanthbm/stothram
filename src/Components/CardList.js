/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {ImageBackground} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import {ThemeContext} from '../providers/ThemeProvider';

const CardList = (props) => {
  const {textColor, backgroundColor} = useContext(ThemeContext);

  function Item({title, goto, displayTitle}) {
    let image = require('../Assets/Images/god.webp');
    return (
      <TouchableRipple
        onPress={() => {
          props.nav.navigate(goto);
        }}
        rippleColor="rgba(0, 0, 0, .32)">
        <React.Fragment>
          <ImageBackground
            source={image}
            style={{
              flex: 1,
              backgroundColor: backgroundColor,
              borderColor: textColor,
              borderWidth: 1,
              height: 100,
            }}
            imageStyle={{
              height: 90,
              resizeMode: 'cover',
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: textColor,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            {displayTitle ? displayTitle : title}
          </Text>
        </React.Fragment>
      </TouchableRipple>
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
