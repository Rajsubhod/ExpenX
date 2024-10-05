import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@context/ThemeContext';
import CustomText from '@components/CustomText';
import SubmitButton from '@components/CustomSelector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import CustomSelector from '@components/CustomSelector';
import { useAuth } from '@context/AuthContext';

const SettingScreen = ({navigation}) => {
  const {handleLogout} = useAuth();
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? '#000' : '#fff';
  const iconColor =  'tomato';
  return (
    <View style={[styles.container, {backgroundColor: theme}]}>
      {/* TODO: DD placeholder for profileImage */}

      <View style={styles.form}>
        <View style={styles.innerForm}>
          <MaterialCommunityIcons name="face-man-profile" size={25} color={iconColor} style={[styles.icon, {marginRight:10}]}/>
          <CustomSelector onPress={() => navigation.navigate('Profile')}>
            Profile Settings
          </CustomSelector>
        </View>

        <View style={styles.innerForm}>
          <AntDesignIcons name="infocirlceo" size={20} color={iconColor} style={[styles.icon, {marginRight: 20}]} /> 
          <CustomSelector onPress={() => navigation.navigate('About')}>
            About Us 
          </CustomSelector>
        </View>

        <View style={styles.innerForm}>
          <AntDesignIcons name="logout" size={20} color={iconColor} style={[styles.icon, {marginRight: 20}]} />
          <CustomSelector onPress={handleLogout}>
            Log Out 
          </CustomSelector>
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  form: {
    marginTop: 80,
    width: '80%',
    alignItems: 'flex-end',
    paddingLeft: 20
  },
  innerForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  icon:{
    padding: 0,
    marginLeft: -30,
  }
});
