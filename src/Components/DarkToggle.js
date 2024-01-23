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
        paddingLeft: 4,
        marginRight: 5,
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
          />
          {darkmode ? (
            <SwitchIcon name={'moon'} color={'#fff'} />
          ) : (
            <SwitchIcon name={'sun'} color={'orange'} />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default React.memo(DarkToggle);
