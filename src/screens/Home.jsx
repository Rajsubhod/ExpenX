import {View, StyleSheet} from 'react-native';
import React from 'react';
import { useTheme } from '@context/ThemeContext';
import CustomText from '@components/CustomText';

const Home = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  return (
    <View style={[styles.home, {backgroundColor : viewColor}]}>
      <CustomText >Home Screen</CustomText>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})