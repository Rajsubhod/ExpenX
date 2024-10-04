import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { useTheme } from './ThemeContext';

const WelcomeButton = ({onPress}) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AntDesignIcons name="right" size={30} color={'#000'}/>
    </TouchableOpacity>
  );
};

export default WelcomeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'tomato',
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 100,
    alignItems: 'center',
  },
});