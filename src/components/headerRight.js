import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Linking,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ThemeContext} from '../contexts/themeContext';
import {getItem, getJSON} from '../utils/dataUtils';
const CustomHeaderRight = ({navigation, showSettings, showViewToggle}) => {
  const {
    darkmode,
    toggleDarkMode,
    darkSwitch,
    viewType,
    toggleViewType,
    backgroundColor,
    textColor,
  } = useContext(ThemeContext);
  const [moneyModal, setMoneyModal] = useState(false);
  const showDialog = () => setMoneyModal(true);
  const hideDialog = () => {
    setAmount(1);
    setMoney(1);
    setMoneyModal(false);
  };

  const [amount, setAmount] = useState(1);
  const [money, setMoney] = useState(1);

  const [upiId, setUpiId] = useState(null);
  const [upiAmounts, setUpiAmounts] = useState(null);

  const PN = 'Stothram';
  const TN = 'Contribute to Stothram';

  useEffect(() => {
    async function init() {
      setUpiId(await getItem('UPI_ID'));
      setUpiAmounts(await getJSON('UPI_AMOUNTS'));
    }
    init();
  }, []);
  const sendMoney = amnt => {
    const url = `paytmmp://pay?pa=${upiId}&pn=${PN}&tn=${TN}&am=${amnt}&cu=INR&mc=0000&tr=01234`;
    Linking.openURL(url);
  };
  return (
    <>
      <View style={styles.headerRightContainer}>
        {upiId && upiId != '' && (
          <TouchableOpacity onPress={showDialog}>
            <FontAwesomeIcon name="rupee" size={26} style={styles.headerIcon} />
          </TouchableOpacity>
        )}
        {showViewToggle && (
          <TouchableOpacity onPress={toggleViewType}>
            <MaterialCommunityIcon
              name={viewType === 'card' ? 'clipboard-list' : 'card-text'}
              size={26}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        )}
        {darkSwitch && (
          <TouchableOpacity onPress={toggleDarkMode}>
            <FeatherIcon
              name={darkmode ? 'sun' : 'moon'}
              size={26}
              style={[styles.headerIcon, {color: darkmode ? 'orange' : '#fff'}]}
            />
          </TouchableOpacity>
        )}
        {showSettings && (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <AntDesignIcon name="setting" size={26} style={styles.headerIcon} />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={moneyModal}
        onRequestClose={hideDialog}>
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, {backgroundColor: backgroundColor}]}>
            <Text style={[styles.modalTitle, {color: textColor}]}>
              Contribute to Stothram
            </Text>
            <Text style={{color: textColor}}>Choose amount</Text>
            <View style={styles.radioButtons}>
              {upiAmounts?.map(amount => (
                <TouchableOpacity
                  key={amount}
                  onPress={() => {
                    setAmount(amount);
                    setMoney(amount);
                  }}>
                  <FontAwesomeIcon
                    name="circle"
                    size={20}
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
                <FontAwesomeIcon
                  name="circle"
                  size={20}
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
                value={money ? money.toString() : ''}
                keyboardType="numeric"
                onChangeText={text => setMoney(text)}
                style={{
                  paddingVertical: 5,
                  fontSize: 20,
                  marginLeft: 10,
                  borderColor: '#ccc',
                  borderWidth: 2,
                  color: textColor,
                }}
              />
            )}
            <View style={styles.modalButtons}>
              <Button onPress={hideDialog} title="Cancel" color="#ccc" />
              <Button
                onPress={() => {
                  sendMoney(money);
                  hideDialog();
                  setAmount(1);
                  setMoney(1);
                }}
                title="Send"
                disabled={amount === 'custom' ? money == null : false}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    marginRight: 12,
    marginLeft: 12,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
};

export default CustomHeaderRight;
