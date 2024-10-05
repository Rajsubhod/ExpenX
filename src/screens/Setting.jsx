import React from 'react';
import {useTheme} from '@context/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from './SettingScreen';
import Profile from './Profile';
import About from './About';
import { StyleSheet, View } from 'react-native';
import CustomText from '@components/CustomText';

const stack = createNativeStackNavigator();

const Setting = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  return (
    <stack.Navigator
      initialRouteName="SettingScreen"
      screenOptions={({route}) => ({
        headerShown: route.name !== 'SettingScreen',
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
        headerTintColor: 'tomato',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 21,
          color: 'gray',
        },
        headerStyle: {
          height: 70,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: viewColor,
        },
      })}>
      <stack.Screen name="SettingScreen" component={SettingScreen} />
      <stack.Screen name="Profile" component={Profile} />
      <stack.Screen name="About" component={About} />
    </stack.Navigator>
  );
};

export default Setting;

const styles = StyleSheet.create({
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  headerTitleText: {
    fontWeight: 'bold',
    fontSize: 21,
    marginLeft: 0,
  },
});
