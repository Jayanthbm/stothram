import React, { useContext } from 'react';

import { COLOR_SCHEME } from '../styles/styles';
import CustomIcon from './customIcon';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/themeContext';

const CustomHeaderLeft = ({ navigation }) => {
  const { darkmode } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    headerIcon: {
      marginLeft: 15,
      color: COLOR_SCHEME[darkmode ? 'DARK' : 'LIGHT'].headertext,
    },
  });

  if (!navigation.canGoBack()) {
    return null;
  }

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
