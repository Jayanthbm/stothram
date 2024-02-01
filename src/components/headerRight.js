import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/themeContext";
import { getItem, getJSON } from "../utils/dataUtils";
import CustomIcon from "./customIcon";
import CustomModal from './customModal';

const styles = StyleSheet.create({
  headerRightContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerIcon: {
    marginRight: 12,
    marginLeft: 12,
    color: "#fff",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  radioButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  radioButtonLabel: {
    marginTop: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

const PN = "Stothram";
const TN = "Contribute to Stothram";

const CustomHeaderRight = ({ navigation, showSettings, showViewToggle }) => {
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

  useEffect(() => {
    async function init() {
      setUpiId(await getItem("UPI_ID"));
      setUpiAmounts(await getJSON("UPI_AMOUNTS"));
    }
    init();
  }, []);

  const sendMoney = (amnt) => {
    const url = `paytmmp://pay?pa=${upiId}&pn=${PN}&tn=${TN}&am=${amnt}&cu=INR&mc=0000&tr=01234`;
    Linking.openURL(url);
  };

  return (
    <>
      <View style={styles.headerRightContainer}>
        {upiId && upiId != "" && (
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
            name="clipboard-list"
            size={26}
            library="MaterialCommunityIcons"
            style={styles.headerIcon}
          />
        )}
        {darkSwitch && (
          <CustomIcon
            onPress={toggleDarkMode}
            name={darkmode ? "sun" : "moon"}
            size={26}
            style={{ color: darkmode ? "orange" : "#fff" }}
            library="Feather"
          />
        )}
        {showSettings && (
          <CustomIcon
            onPress={() => navigation.navigate("Settings")}
            name="setting"
            size={26}
            library="AntDesign"
            style={styles.headerIcon}
          />
        )}
      </View>
      <CustomModal
        visible={moneyModal}
        onClose={hideDialog}
        backgroundColor={backgroundColor}
      >
        <Text style={[styles.modalTitle, { color: textColor }]}>
          Contribute to Stothram
        </Text>
        <Text style={{ color: textColor }}>Choose amount</Text>
        <View style={styles.radioButtons}>
          {upiAmounts?.map((amount) => (
            <TouchableOpacity
              key={amount}
              onPress={() => {
                setAmount(amount);
                setMoney(amount);
              }}
            >
              <CustomIcon
                name="circle"
                size={20}
                library="FontAwesome"
                color={amount === money ? "#007BFF" : "#ccc"}
              />
              <Text style={[styles.radioButtonLabel, { color: textColor }]}>
                ₹{amount}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => {
              setAmount("custom");
              setMoney(null);
            }}
          >
            <CustomIcon
              name="circle"
              size={20}
              library="FontAwesome"
              color={amount === "custom" ? "#007BFF" : "#ccc"}
            />
            <Text style={[styles.radioButtonLabel, { color: textColor }]}>
              Custom ₹
            </Text>
          </TouchableOpacity>
        </View>
        {amount === "custom" && (
          <TextInput
            label="Choose amount"
            value={money ? money.toString() : ""}
            keyboardType="numeric"
            onChangeText={(text) => setMoney(text)}
            style={{
              paddingVertical: 5,
              fontSize: 20,
              marginLeft: 10,
              borderColor: "#ccc",
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
            disabled={amount === "custom" ? money == null : false}
          />
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

export default CustomHeaderRight;
