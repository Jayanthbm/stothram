/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Switch} from 'react-native';
import {ThemeContext} from '../providers/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';
const DarkToggle = (props) => {
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
          {darkmode === true ? (
            <Icon
              name={'moon'}
              style={{
                color: '#000',
                fontSize: 22,
                textAlign: 'center',
                paddingLeft: 3,
              }}
            />
          ) : (
            <Icon
              name={'sun'}
              style={{
                color: 'orange',
                fontSize: 22,
                textAlign: 'center',
                paddingLeft: 3,
              }}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default React.memo(DarkToggle);
