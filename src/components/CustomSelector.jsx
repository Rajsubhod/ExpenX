import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import CustomText from './CustomText';
import { useTheme } from '@context/ThemeContext';

const CustomSelector = ({children, onPress}) => {
    const {isDarkMode} = useTheme();
    const theme = isDarkMode ? '#000' : '#fff';
    const borderBottomColor = isDarkMode ? 'tomato' : '#ccc';
    const text = isDarkMode ? 'tomato' : '#000';

  return (
    <TouchableOpacity style={[styles.button,{backgroundColor:theme, borderBottomColor: borderBottomColor} ]} onPress={onPress}>
      <CustomText style={[styles.textTheme, {color: text}]}>{children}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomSelector;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Align text to the left
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 70,
    width: '100%',
    marginVertical: 10,
  },
  textTheme:{
    fontSize: 16,
    fontWeight: 'bold',
  }
});