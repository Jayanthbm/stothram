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
        titleStyle={{color: textColor, fontWeight: 'bold', fontSize: 16}}
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
          titleStyle={{color: textColor, fontSize: 14}}
          descriptionStyle={{color: textColor, fontSize: 12}}
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
            description={props.subtitle}
            titleStyle={{color: textColor, fontSize: 12}}
            descriptionStyle={{color: textColor, fontSize: 10}}
            left={_props =>
              props.image ? (
                <Avatar.Image size={40} source={props.image} />
              ) : (
                <Avatar.Text size={40} label={props.title[0]} />
              )
            }
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
        <SLISTHEADER title={'Contributions'} icon={'information'} />
        <SCL
          image={jayanth}
          title={'Jayanthbharadwaj M'}
          subtitle="Developer"
        />
        <SCL image={yoga} title={'Yoga'} subtitle="Editor" />
        <SCL image={null} title={'Sharath'} subtitle="Editor" />
        <View style={{marginTop: 12, alignItems: 'center'}}>
          <Button
            icon="share"
            mode="text"
            textColor={'#5098E6'}
            onPress={onShare}
            compact={false}
            uppercase={false}
            labelStyle={{
              fontSize: 16,
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
            marginBottom: 5,
          }}>
          <Text style={{color: textColor, fontSize: 20}}>Made With {''}</Text>
          <Icon
            name={'heart'}
            style={{
              color: 'red',
              fontSize: 25,
              marginTop: 5,
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
