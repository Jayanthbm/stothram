import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CACHED_DATA_KEYS } from '../constants';
import { ThemeContext } from '../contexts/themeContext';
import { getItem, getJSON, isInternetConnected } from '../utils/dataUtils';
import CustomIcon from './customIcon';
import CustomModal from './customModal';
import ImageButton from './imageButton';

const styles = StyleSheet.create({
  headerRightContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerIcon: {
    marginRight: 12,
    marginLeft: 12,
    color: '#fff',
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  radioButtonLabel: {
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});

const CustomHeaderRight = ({navigation, showSettings, showViewToggle}) => {
  const {darkmode, toggleDarkMode, darkSwitch, toggleViewType, textColor,viewType} =
    useContext(ThemeContext);
  const [moneyModal, setMoneyModal] = useState(false);
  const showDialog = () => setMoneyModal(true);
  const [internetState, setInternetState] = useState(false);
  const hideDialog = () => {
    setAmount(1);
    setMoney(1);
    setMoneyModal(false);
  };

  const [amount, setAmount] = useState(1);
  const [money, setMoney] = useState(1);

  const [upiId, setUpiId] = useState(null);
  const [upidata, setUpiData] = useState(null);

  useEffect(() => {
    async function init() {
      setUpiId(await getItem(CACHED_DATA_KEYS.UPI_ID));
      setUpiData(await getJSON(CACHED_DATA_KEYS.UPI_DATA));
      setInternetState(await isInternetConnected());
    }
    init();
  }, []);

  //generate 10 letter transaction id include letter and numbers
  function genearteTransactionId() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }


  const openPaymentApp = async (payApp, amnt) => {
   if(isNaN(amnt)) {
     alert('Please enter valid amount');
     return;
   }
    if (amnt < 1) {
      alert('Please enter amount greater than 0');
      return;
    }
   let url = '';
   switch (payApp) {
     case 'PAYTM':
       url = 'paytmmp://';
       break;
     case 'GPAY':
       url = 'tez://upi/';
       break;
     case 'PHONEPE':
       url = 'phonepe://';
       break;
     case 'BHIM':
       url = 'upi://';
   }

   url =
     url +
     `pay?pa=${upiId}&pn=${upidata?.payee_name}&tn=${
       upidata?.transaction_note
     }&am=${amnt}&cu=INR&mc=0000&tr=${genearteTransactionId()}`;
   hideDialog();
   setAmount(1);
   setMoney(1);
   try {
     await Linking.openURL(url);
   } catch (err) {
     console.error('ERROR : ', err);
   }
 };

  return (
    <>
      <View style={styles.headerRightContainer}>
        {internetState && upiId && upiId != '' && (
          <CustomIcon
            onPress={showDialog}
            name="rupee"
            size={26}
            library="FontAwesome"
            style={styles.headerIcon}
          />
        )}
        {showViewToggle && (
          <CustomIcon
            onPress={toggleViewType}
            name={viewType === 'list' ? 'grid' :'list' }
            size={26}
            library="Feather"
            style={styles.headerIcon}
          />
        )}
        {darkSwitch && (
          <CustomIcon
            onPress={toggleDarkMode}
            name={darkmode ? 'sun' : 'moon'}
            size={26}
            style={{color: darkmode ? 'orange' : '#fff'}}
            library="Feather"
          />
        )}
        {showSettings && (
          <CustomIcon
            onPress={() => navigation.navigate('Settings')}
            name="settings"
            size={26}
            library="Feather"
            style={styles.headerIcon}
          />
        )}
      </View>
      <CustomModal
        visible={moneyModal}
        onClose={hideDialog}
        title="Contribute to Stothram">
        <Text style={{color: textColor}}>Choose amount</Text>
        <View style={styles.radioButtons}>
          {upidata && upidata.upi_amounts?.map(amount => (
            <TouchableOpacity
              key={amount}
              onPress={() => {
                setAmount(amount);
                setMoney(amount);
              }}>
              <CustomIcon
                name="circle"
                size={20}
                library="FontAwesome"
                color={amount === money ? '#007BFF' : '#ccc'}
              />
              <Text style={[styles.radioButtonLabel, {color: textColor}]}>
                ₹{amount}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => {
              setAmount('custom');
              setMoney(null);
            }}>
            <CustomIcon
              name="circle"
              size={20}
              library="FontAwesome"
              color={amount === 'custom' ? '#007BFF' : '#ccc'}
            />
            <Text style={[styles.radioButtonLabel, {color: textColor}]}>
              Custom ₹
            </Text>
          </TouchableOpacity>
        </View>
        {amount === 'custom' && (
          <TextInput
            label="Choose amount"
            placeholder="Enter amount"
            placeholderTextColor={textColor}
            value={money ? money.toString() : ''}
            keyboardType="numeric"
            onChangeText={text => setMoney(text)}
            style={{
              paddingVertical: 3,
              fontSize: 18,
              borderColor: '#ccc',
              borderWidth: 2,
              color: textColor,
              marginBottom: 10,
            }}
          />
        )}
        <Text style={{color: textColor, textAlign: 'center'}}>
          Choose App to pay
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <ImageButton
            onPress={() => openPaymentApp('PHONEPE', money)}
            name={'PHONEPE'}
          />

          <ImageButton
            onPress={() => openPaymentApp('GPAY', money)}
            name={'GPAY'}
          />

          <ImageButton
            onPress={() => {
              openPaymentApp('PAYTM', money);
            }}
            name={'PAYTM'}
          />

          <ImageButton
            onPress={() => openPaymentApp('BHIM', money)}
            name={'BHIM'}
          />
        </View>
        <View style={styles.modalButtons}>
          <Button onPress={hideDialog} title="Cancel" color="#ccc" />
        </View>
      </CustomModal>
    </>
  );
};

CustomHeaderRight.propTypes = {
  navigation: PropTypes.object.isRequired,
  showSettings: PropTypes.bool,
  showViewToggle: PropTypes.bool,
};

export default React.memo(CustomHeaderRight);
