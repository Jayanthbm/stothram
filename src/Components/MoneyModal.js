import React, {useContext, useState} from 'react';
import {Linking, View} from 'react-native';

import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';
import {ThemeContext} from '../providers/ThemeProvider';

const UPIID = '8892218@ybl';
const PN = 'Stothram';
const TN = 'Contribute to Stothram';

const MoneyModal = props => {
  const {headerBackground} = useContext(ThemeContext);
  const [amount, setAmount] = useState(1);
  const [money, setMoney] = useState(1);

  const sendMoney = amnt => {
    const url = `paytmmp://pay?pa=${UPIID}&pn=${PN}&tn=${TN}&am=${amnt}&cu=INR&mc=0000&tr=01234`;
    Linking.openURL(url);
  };

  const MyRadioButtonItem = props => {
    return (
      <RadioButton.Item
        value={props.value}
        label={props.label}
        disabled={false}
        rippleColor={headerBackground}
        labelStyle={{fontSize: 15, fontWeight: 'bold', color: 'black'}}
        mode="android"
        uncheckedColor="#ccc"
      />
    );
  };
  return (
    <View>
      <Portal>
        <Dialog visible={props.visible} onDismiss={props.hideDialog}>
          <Dialog.Content>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Contribute to Stothram
            </Text>
            <Text> Choose amount</Text>
            <RadioButton.Group
              onValueChange={newValue => {
                if (newValue === 'custom') {
                  setAmount(newValue);
                  setMoney(null);
                } else {
                  setAmount(newValue);
                  setMoney(newValue);
                }
              }}
              value={amount}>
              <MyRadioButtonItem label="₹1" value={1} mode="ios" />
              <MyRadioButtonItem label="₹10" value={10} mode="ios" />
              <MyRadioButtonItem label="₹50" value={50} mode="ios" />
              <MyRadioButtonItem label="Custom ₹" value={'custom'} mode="ios" />
            </RadioButton.Group>
            {amount === 'custom' && (
              <TextInput
                label="Choose amount"
                value={money}
                keyboardType="numeric"
                onChangeText={text => setMoney(text)}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                props.hideDialog();
                setAmount(1);
                setMoney(1);
              }}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                sendMoney(money);
                props.hideDialog();
                setAmount(1);
                setMoney(1);
              }}
              disabled={amount === 'custom' ? money == null : false}>
              Send
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default React.memo(MoneyModal);
