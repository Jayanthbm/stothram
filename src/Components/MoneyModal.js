import React, {useState} from 'react';
import {Linking, View} from 'react-native';

import {
  Button,
  Dialog,
  Portal,
  RadioButton,
  TextInput,
} from 'react-native-paper';

const UPIID = '8892218@ybl';
const PN = 'Stothram';
const TN = 'Contribute to Stothram';

const MoneyModal = props => {
  const [amount, setAmount] = useState(1);
  const [money, setMoney] = useState(1);

  const sendMoney = amnt => {
    const url = `paytmmp://pay?pa=${UPIID}&pn=${PN}&tn=${TN}&am=${amnt}&cu=INR&mc=0000&tr=01234`;
    Linking.openURL(url);
  };

  return (
    <View>
      <Portal>
        <Dialog visible={props.visible} onDismiss={props.hideDialog}>
          <Dialog.Title>Contribute</Dialog.Title>
          <Dialog.Content>
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
              <RadioButton.Item label="1" value={1} />
              <RadioButton.Item label="10" value={10} />
              <RadioButton.Item label="50" value={50} />
              <RadioButton.Item label="100" value={100} />
              <RadioButton.Item label="Custom" value={'custom'} />
            </RadioButton.Group>
            {amount === 'custom' && (
              <TextInput
                label="choose amount"
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
