import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText';

const SubmitButton = ({children, onPress}) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CustomText style={[styles.textTheme]}>{children}</CustomText>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'tomato',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  textTheme:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  }
});