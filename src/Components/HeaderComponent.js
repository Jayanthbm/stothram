/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {BackHandler, Text} from 'react-native';
import {Appbar} from 'react-native-paper';
import {ThemeContext} from '../providers/ThemeProvider';
import DarkToggle from './DarkToggle';
import MoneyModal from './MoneyModal';
const HeaderComponent = props => {
  const {viewType, toggleViewType, headerBackground} = useContext(ThemeContext);
  const [moneyModal, setMoneyModal] = useState(false);
  const showDialog = () => setMoneyModal(true);
  const hideDialog = () => setMoneyModal(false);
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
      style={{
        backgroundColor: headerBackground,
      }}>
      <Appbar.BackAction
        onPress={() => {
          props.navigation.navigate(props.back);
        }}
        iconColor={'#fff'}
      />
      <Appbar.Content
        title={props.title}
        titleStyle={{
          color: '#fff',
        }}
      />
      <Text
        onPress={showDialog}
        style={{
          color: '#fff',
          fontSize: 20,
          marginRight: 10,
          padding: 10,
        }}>
        ₹
      </Text>
      {props.viewType && (
        <Appbar.Action
          icon={viewType === 'card' ? 'clipboard-list' : 'card-text'}
          onPress={toggleViewType}
          iconColor={'#fff'}
        />
      )}
      <DarkToggle />
      <MoneyModal visible={moneyModal} hideDialog={hideDialog} />
    </Appbar.Header>
  );
};
export default React.memo(HeaderComponent);
