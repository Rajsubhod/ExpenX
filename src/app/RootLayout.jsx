import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

import Home from '@screens/Home';
import { useTheme } from '@components/ThemeContext';
import CustomText from '@components/CustomText';
import Setting from '@screens/Setting';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppIcon = () => (
  <Image
    source={require('../assets/accounting_light.png')}
    style={{width: 40, height: 40, marginRight: 10}}
    tintColor={'tomato'}
  />
);

const RootLayout = () => {

  const {isDarkMode} = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarActiveTintColor: 'tomato',
          tabBarStyle: {
            height: 65, 
            paddingBottom: 10,
            // backgroundColor: 'orange',
            elevation: 10,
            shadowOpacity: 0,
            borderTopWidth: 0,
            backgroundColor: isDarkMode ? '#000' : '#fff',
          },
          
          headerTitle: ({children}) => (
            <View style={styles.screenHeader}>
              <AppIcon/>
              <CustomText style={styles.headerTitleText}>{children}</CustomText>
            </View>
          ),
          headerStyle: {
            // backgroundColor: '#f4511e',
            height: 70,
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: isDarkMode ? '#000' : '#fff',
          },
        })}
        >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <AntDesignIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: ({color, size}) => (
              <IonIcons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootLayout;

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
});
