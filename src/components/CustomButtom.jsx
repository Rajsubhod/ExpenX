import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText';
import { useTheme } from '@context/ThemeContext';

const CustomButtom = ({children, onPress, disabled=false, ...props}) => {
    const {isDarkMode} = useTheme();
    const text = isDarkMode ? '#000' : '#fff';
    const colorWhenDisabled = disabled ? 'gray' : 'tomato';

  return (
    <TouchableOpacity style={[styles.button,{backgroundColor:colorWhenDisabled} ]} onPress={onPress} disabled={disabled} {...props}>
      <CustomText style={[styles.textTheme, {color: text}]}>{children}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomButtom;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
    height: 50,
    width: '100%',
    marginVertical: 10,
    marginHorizontal: 10,
    marginLeft: -3
  },
  textTheme:{
    fontSize: 16,
    fontWeight: 'bold',
    
  }
});