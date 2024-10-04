import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '@screens/Welcome';
import Login from '@screens/Login';
import SignUp from '@screens/SignUp';

const stack = createNativeStackNavigator();

const AuthLayout = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen name="Welcome" component={Welcome} />
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="SignUp" component={SignUp} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthLayout;
