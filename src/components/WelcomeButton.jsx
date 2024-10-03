import { TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { useTheme } from './ThemeContext';

const WelcomeButton = () => {
  const isDarkMode = useTheme();
  const theme = isDarkMode ? '#000' : '#fff';
  return (
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <AntDesignIcons name="right" size={30} color={theme}/>
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
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});