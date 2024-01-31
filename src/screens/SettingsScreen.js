import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {ThemeContext} from '../contexts/themeContext';

import Admob from '../components/admob';
import CustomHeaderLeft from '../components/headerLeft';
import {CACHED_DATA_KEYS, DATA_URLS, SCREEN_NAMES} from '../constants';
import {commonNavigationOptions} from '../navigationOptions';
import {dataHelper} from '../utils/dataUtils';
const SettingsScreen = ({navigation}) => {
  const {
    backgroundColor,
    textColor,
    headerBackground,
    toggleDarkMode,
    darkmode,
    toggleDarkSwitch,
    darkSwitch,
  } = useContext(ThemeContext);

  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await dataHelper(
        CACHED_DATA_KEYS.SETTINGS_SCREEN,
        DATA_URLS.SETTINGS_SCREEN,
        SCREEN_NAMES.SETTINGS_SCREEN,
      );
      if (fetchedData) {
        setContributions(fetchedData?.contributions);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      ...commonNavigationOptions(headerBackground),
      headerLeft: () => <CustomHeaderLeft navigation={navigation} />,
    });
  }, [navigation, headerBackground]);

  const renderListHeader = (title, icon) => (
    <View style={styles.listHeaderContainer}>
      <FontAwesomeIcon
        name={icon}
        style={styles.listHeaderIcon}
        color={textColor}
      />
      <Text style={[styles.listHeaderText, {color: textColor}]}>{title}</Text>
    </View>
  );

  const renderListItem = (title, subtitle, toggle, state) => (
    <TouchableOpacity
      onPress={toggle}
      style={styles.listItemContainer}
      key={title}>
      <View style={styles.listItemContent}>
        <Text style={[styles.listItemTitle, {color: textColor}]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.listItemSubtitle, {color: textColor}]}>
            {subtitle}
          </Text>
        )}
      </View>
      {toggle && (
        <Switch
          value={state}
          onValueChange={toggle}
          trackColor={{false: '#ccc', true: '#81b0ff'}}
          thumbColor={state ? '#5098E6' : '#f4f3f4'}
        />
      )}
    </TouchableOpacity>
  );

  const onShare = async () => {
    try {
      await Share.share({
        message:
          'https://play.google.com/store/apps/details?id=com.jayanth.shotram',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <ScrollView>
        {renderListHeader('General Settings', 'cog')}
        {renderListItem(
          'Dark theme',
          'Reduce glare and improve night viewing',
          toggleDarkMode,
          darkmode,
        )}
        {renderListItem(
          'Toggle in Every Page',
          'Show option to toggle dark mode in every screen',
          toggleDarkSwitch,
          darkSwitch,
        )}
        {renderListHeader('Contributions', 'info')}
        {contributions?.map(({name, role}) =>
          renderListItem(name, role, null, null),
        )}

        <View
          style={{
            marginTop: 12,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <FontAwesomeIcon name={'share'} size={24} color={textColor} />
          <Button
            onPress={onShare}
            title="Share App with friends/family"
            color="#5098E6"
            accessibilityLabel="Share App with friends/family"
          />
        </View>
      </ScrollView>
      <React.Fragment>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 5,
          }}>
          <Text style={{color: textColor, fontSize: 20}}>Made With {''}</Text>
          <AntDesignIcon
            name={'heart'}
            style={{
              color: 'red',
              fontSize: 25,
              marginTop: 1,
            }}
          />
          <Text style={{color: textColor, fontSize: 20}}> In India</Text>
        </View>
        <Admob />
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  listHeaderIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 18,
  },
  listItemSubtitle: {
    fontSize: 14,
  },
  madeInIndiaContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5,
  },
});
export default SettingsScreen;
