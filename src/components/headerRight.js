import React, {useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../contexts/themeContext';
const CustomHeaderRight = ({navigation, showSettings}) => {
  const {darkmode, toggleDarkMode, darkSwitch} = useContext(ThemeContext);
  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesomeIcon name="rupee" size={26} style={styles.headerIcon} />
      </TouchableOpacity>
      {darkSwitch && (
        <TouchableOpacity onPress={toggleDarkMode}>
          {darkmode ? (
            <FeatherIcon
              name="sun"
              size={26}
              style={[styles.headerIcon, {color: 'orange'}]}
            />
          ) : (
            <FeatherIcon name="moon" size={26} style={styles.headerIcon} />
          )}
        </TouchableOpacity>
      )}
      {showSettings && (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <AntDesignIcon name="setting" size={26} style={styles.headerIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  headerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerIcon: {
    marginRight: 8,
    marginLeft: 8,
    color: '#fff',
  },
};

export default CustomHeaderRight;
