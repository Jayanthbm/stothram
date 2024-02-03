import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../contexts/themeContext";

const styles = StyleSheet.create({
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
});

const CustomModal = ({ visible, onClose,title, children }) => {
  const {darkmode, textColor, backgroundColor} = useContext(ThemeContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor: backgroundColor}]}>
          <>
            <Text style={[styles.modalTitle, {color: textColor}]}>{title}</Text>
            {children}
          </>
        </View>
      </View>
    </Modal>
  );
};

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;
