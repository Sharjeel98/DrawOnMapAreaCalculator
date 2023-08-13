import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

//***----Simple Button----***//
const MyButton = props => {
  const {onPress, title, myStyles, itsTextStyle, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.buttonContainer, myStyles]}
      onPress={onPress}>
      <Text style={[styles.buttonText, itsTextStyle]}>
        {title !== undefined ? title : 'Button'}
      </Text>
    </TouchableOpacity>
  );
};

//**-----styles -------**/
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#C4BB76',
    paddingHorizontal: '4%',
    paddingVertical: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    borderColor: '#9A9252',
    borderWidth: 3,
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export {MyButton};
