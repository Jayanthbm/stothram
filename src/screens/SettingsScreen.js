import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  ScrollView,
  Share,
  StyleSheet,
  Text,
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
import ListHeader from '../components/listHeader';
import ListItem from '../components/listItem';
import { commonStyles } from '../styles/styles';

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
    <View style={[commonStyles.container, {backgroundColor: backgroundColor}]}>
      <ScrollView>
        {/* General Settings */}
        <ListHeader title="General Settings" icon={'cog'} />
        <ListItem
          title="Dark theme"
          subtitle="Reduce glare and improve night viewing"
          toggle={toggleDarkMode}
          state={darkmode}
        />
        <ListItem
          title="Toggle in Every Page"
          subtitle="Show option to toggle dark mode in every screen"
          toggle={toggleDarkSwitch}
          state={darkSwitch}
        />

        {/* Contributions */}
        <ListHeader title="Contributions" icon={'info'} />
        {contributions?.map(({name, role}) => (
          <ListItem title={name} subtitle={role} key={name} />
        ))}
      </ScrollView>
      {/* Share and Made in India section */}
      <React.Fragment>
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
        <View style={styles.madeInIndiaContainer}>
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
        {/* Admob */}
        <Admob />
      </React.Fragment>
    </View>
  );
};

const styles = StyleSheet.create({
  madeInIndiaContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 5,
  },
});
export default SettingsScreen;
