import React from 'react';
import {useTheme} from '@context/ThemeContext';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from './SettingScreen';
import Profile from './Profile';
import About from './About';

const stack = createNativeStackNavigator();

const Setting = () => {
  const {isDarkMode} = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';
  return (
    <stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        }}>
        <stack.Screen name="SettingScreen" component={SettingScreen} />
        <stack.Screen name="Profile" component={Profile} />
        <stack.Screen name="About" component={About} />
      </stack.Navigator>
  );
};

export default Setting;
