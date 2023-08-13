import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

const MyModal = props => {
  const {modalBody, visible, onRequestClose} = props;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <Pressable style={styles.modalParent} onPress={onRequestClose}>
          <Pressable style={styles.modalSubview}>{modalBody}</Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export {MyModal};

const styles = StyleSheet.create({
  modalParent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalSubview: {
    backgroundColor: '#fff',
    width: '80%',
    paddingVertical: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
});
