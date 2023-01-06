/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {ThemeContext} from '../providers/ThemeProvider';

const SwitchIcon = ({name, color}) => {
  return (
    <Icon
      name={name}
      style={{
        color: color,
        fontSize: 22,
        textAlign: 'center',
        paddingLeft: 3,
      }}
    />
  );
};

const DarkToggle = () => {
  const {darkmode, toggleDarkMode, darkSwitch} = useContext(ThemeContext);
  return (
    <React.Fragment>
      {darkSwitch && (
        <React.Fragment>
          <Switch
            value={darkmode}
            onValueChange={toggleDarkMode}
            trackColor={{false: '#ccc', true: '#81b0ff'}}
            thumbColor={darkmode ? '#D5E650' : '#f4f3f4'}
            style={{
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          />
          {darkmode ? (
            <SwitchIcon name={'moon'} color={'#000'} />
          ) : (
            <SwitchIcon name={'sun'} color={'orange'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default React.memo(DarkToggle);
