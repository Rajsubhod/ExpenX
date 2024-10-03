import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { useTheme } from './ThemeContext';
import CustomText from './CustomText';

const SubmitButton = ({onPress}) => {

  const handlePress = () => {

    
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CustomText style={[styles.textTheme]}>Sign Up</CustomText>
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