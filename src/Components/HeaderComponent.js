/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {BackHandler} from 'react-native';
import DarkToggle from './DarkToggle';
import {ThemeContext} from '../providers/ThemeProvider';
import {Appbar} from 'react-native-paper';
const HeaderComponent = (props) => {
  const {headerBackground, viewType, toggleViewType} = useContext(ThemeContext);

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate(props.back);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [props.navigation, props.back]);
  return (
    <Appbar.Header
      style={{backgroundColor: headerBackground, height: 50}}
      dark={true}>
      <Appbar.BackAction
        onPress={() => {
          props.navigation.navigate(props.back);
        }}
      />
      <Appbar.Content title={props.title} />
      {props.viewType && (
        <Appbar.Action
          icon={viewType === 'card' ? 'clipboard-list' : 'card-outline'}
          onPress={toggleViewType}
        />
      )}
      <DarkToggle />
    </Appbar.Header>
  );
};
export default React.memo(HeaderComponent);
