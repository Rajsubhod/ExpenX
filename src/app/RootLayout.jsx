import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons'

import Home from '@screens/Home'
import Profile from '@screens/Profile'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AppIcon = () => (
  <Image
    source={require('../assets/accounting_light.png')}  
    style={{ width: 40, height: 40, marginRight: 10, }}
  />
);

const RootLayout = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({

        headerTitle: ({ children }) => (
          <View style={styles.screenHeader}>
            <AppIcon />
            <Text style={styles.headerTitleText}>{children}</Text>
          </View>
        ),
        headerStyle: {
          // backgroundColor: '#f4511e',
          height: 70,
        },
      })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    height: 80,
    marginTop: 5,
  },
  headerTitleText: {
    fontWeight: 'bold',
    fontSize: 21,
    marginLeft: 10,
  },
})