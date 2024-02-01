import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../contexts/themeContext';
const ListHeader = ({ title, icon }) => {
   const {
     textColor,
   } = useContext(ThemeContext);
  return (
    <View style={styles.listHeaderContainer}>
      <FontAwesomeIcon
        name={icon}
        style={styles.listHeaderIcon}
        color={textColor}
      />
      <Text style={[styles.listHeaderText, {color: textColor}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  listHeaderIcon: {
    fontSize: 25,
    marginRight: 10,
  },
  listHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListHeader;