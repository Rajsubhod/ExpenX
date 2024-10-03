import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@components/ThemeContext';
import CustomText from '@components/CustomText';

const Setting = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  return (
    <View style={[styles.setting, {backgroundColor : viewColor}]}>
      <CustomText >Setting Screen</CustomText>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
    setting: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})