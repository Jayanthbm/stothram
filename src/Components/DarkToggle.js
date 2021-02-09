/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Switch} from 'react-native';
import {ThemeContext} from '../providers/ThemeProvider';

const DarkToggle = (props) => {
  const {darkmode, toggleDarkMode, darkSwitch} = useContext(ThemeContext);
  return (
    <React.Fragment>
      {darkSwitch && (
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
      )}
    </React.Fragment>
  );
};
export default React.memo(DarkToggle);
