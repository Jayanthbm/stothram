import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from '../contexts/themeContext';
import { COLOR_SCHEME } from '../styles/styles';

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listItemContent: {
    flex: 1,
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  listItemTitle: {
    fontSize: 14,
    fontFamily: 'NotoSans',
  },
  listItemSubtitle: {
    fontSize: 12,
    fontFamily: 'NotoSans',
  },
});

const ListItem = ({ title, subtitle, toggle, state }) => {
  const { darkmode } = useContext(ThemeContext);

  // Provide default values for optional props
  const renderSubtitle = subtitle && (
    <Text
      style={[
        styles.listItemSubtitle,
        {
          color: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor,

        },
      ]}>
      {subtitle}
    </Text>
  );

  return (
    <TouchableOpacity
      onPress={toggle}
      style={styles.listItemContainer}
      underlayColor={
        COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground
      }>
      <View
        style={[
          styles.listItemContent,
          {
            borderBottomColor:
              COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].borderColor,
          },
        ]}>
        <Text
          style={[
            styles.listItemTitle,
            {
              color: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].textColor,

            },
          ]}>
          {title}
        </Text>
        {renderSubtitle}
      </View>
      {toggle && (
        <Switch
          value={state}
          onValueChange={toggle}
          trackColor={{
            false: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground,
            true: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
          }}
          thumbColor={
            state
              ? COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headerBackground
              : COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext
          }
        />
      )}
    </TouchableOpacity>
  );
};

// PropTypes for better documentation
ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  toggle: PropTypes.func,
  state: PropTypes.bool,
};

export default ListItem;
