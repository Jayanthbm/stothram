/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import DarkToggle from './DarkToggle';
import {ThemeContext} from '../providers/ThemeProvider';
import {Appbar} from 'react-native-paper';
const HeaderComponent = (props) => {
  const {headerBackground, viewType, toggleViewType} = useContext(ThemeContext);
  return (
    <Appbar.Header
      style={{backgroundColor: headerBackground, height: 50}}
      dark={true}>
      <Appbar.BackAction onPress={props.backAction} />
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
