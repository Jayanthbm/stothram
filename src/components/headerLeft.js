import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import CustomIcon from './customIcon';
import { ThemeContext } from '../contexts/themeContext';
import { COLOR_SCHEME } from '../styles/styles';
const CustomHeaderLeft = ({ navigation }) => {
  const { darkmode } = useContext(ThemeContext);
  const styles = StyleSheet.create({
    headerIcon: {
      marginLeft: 15,
      color: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
    },
  });

  const renderButton = navigation.goBack && (
    <CustomIcon
      onPress={() => navigation.goBack()}
      name="chevron-left"
      size={30}
      library="Feather"
      style={styles.headerIcon}
    />
  );

  return renderButton;
};

CustomHeaderLeft.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CustomHeaderLeft;
