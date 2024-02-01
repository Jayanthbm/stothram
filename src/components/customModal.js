import React, { useContext } from "react";
import { Modal, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/themeContext";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
});

const CustomModal = ({ visible, onClose, children, backgroundColor }) => {
  const { darkmode } = useContext(ThemeContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View
          style={[styles.modalContent, { backgroundColor: backgroundColor }]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default CustomModal;
