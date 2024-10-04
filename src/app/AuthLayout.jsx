import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '@screens/Welcome';
import Login from '@screens/Login';
import SignUp from '@screens/SignUp';
import { useTheme } from '@context/ThemeContext';

const stack = createNativeStackNavigator();

const AuthLayout = () => {

  const {isDarkMode} = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };


  return (
    <NavigationContainer theme={{
      colors: {
        background: backgroundStyle.backgroundColor,
      },
    }}>
      <stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        }}>
        <stack.Screen name="Welcome" component={Welcome} />
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="SignUp" component={SignUp} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthLayout;
