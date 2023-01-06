/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {ScrollView, Share, Switch, View} from 'react-native';
import {
  Avatar,
  Button,
  Divider,
  List,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/AntDesign';
import Admob from '../Components/Admob';
import HeaderComponent from '../Components/HeaderComponent';
import {ThemeContext} from '../providers/ThemeProvider';

const jayanth = require('../Assets/Images/jayanth.webp');
const yoga = require('../Assets/Images/yoga.webp');

const SettingsScreen = ({navigation}) => {
  const {
    darkmode,
    toggleDarkMode,
    darkSwitch,
    backgroundColor,
    textColor,
    toggleDarkSwitch,
    headerBackground,
  } = useContext(ThemeContext);

  const SLISTHEADER = props => {
    return (
      <List.Item
        title={props.title}
        titleStyle={{color: textColor, fontWeight: 'bold', fontSize: 20}}
        left={_props => (
          <List.Icon {...props} icon={props.icon} color={textColor} />
        )}
        style={{
          marginLeft: 20,
        }}
      />
    );
  };

  const SLISTITEM = props => {
    return (
      <TouchableRipple
        onPress={props.toggle}
        rippleColor="rgba(0, 0, 0, .32)"
        centered={true}>
        <List.Item
          title={props.title}
          description={props.subtitle}
          titleStyle={{color: textColor, fontSize: 16}}
          descriptionStyle={{color: textColor}}
          right={_props => (
            <Switch
              value={props.state}
              onValueChange={props.toggle}
              trackColor={{false: '#ccc', true: '#81b0ff'}}
              thumbColor={props.state ? '#5098E6' : '#f4f3f4'}
            />
          )}
        />
      </TouchableRipple>
    );
  };

  const SCL = props => {
    return (
      <>
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          centered={true}
          style={{marginLeft: 10}}>
          <List.Item
            title={props.title}
            titleStyle={{color: textColor}}
            left={_props => <Avatar.Image size={50} source={props.image} />}
          />
        </TouchableRipple>
        <Divider style={{backgroundColor: headerBackground}} />
      </>
    );
  };
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
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <ScrollView>
        <HeaderComponent
          navigation={navigation}
          back={'HomeScreen'}
          title={'Settings'}
        />
        <SLISTHEADER title={'General Settings'} icon={'cogs'} />
        <SLISTITEM
          toggle={toggleDarkMode}
          title={'Dark theme'}
          subtitle={'Reduce glare and improve night viewing'}
          state={darkmode}
        />
        <SLISTITEM
          toggle={toggleDarkSwitch}
          title={'Toggle in Every Page'}
          subtitle={'Show toggle dark mode switch in every page'}
          state={darkSwitch}
        />
        <SLISTHEADER title={'Created By'} icon={'information'} />
        <SCL image={jayanth} title={'Jayanthbharadwaj M'} />
        <SCL image={yoga} title={'Yoga'} />

        <View style={{marginTop: 25, alignItems: 'center'}}>
          <Button
            icon="share"
            mode="text"
            textColor={textColor}
            onPress={onShare}
            compact={false}
            uppercase={false}
            labelStyle={{
              fontSize: 20,
            }}>
            Share App with friends/family
          </Button>
        </View>
      </ScrollView>
      <React.Fragment>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 7,
          }}>
          <Text style={{color: textColor, fontSize: 20}}>Made With {''}</Text>
          <Icon
            name={'heart'}
            style={{
              color: 'red',
              fontSize: 25,
            }}
          />
          <Text style={{color: textColor, fontSize: 20}}> In India</Text>
        </View>
        <Admob />
      </React.Fragment>
    </View>
  );
};

export default SettingsScreen;
