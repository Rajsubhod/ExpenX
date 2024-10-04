import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@context/ThemeContext';
import CustomText from '@components/CustomText';
import SubmitButton from '@components/CustomSelector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const SettingScreen = ({navigation}) => {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? '#000' : '#fff';
  const iconColor = isDarkMode ? 'tomato' : 'gray';
  return (
    <View style={[styles.container, {backgroundColor: theme}]}>
      {/* TODO: DD placeholder for profileImage */}

      <View style={styles.form}>
        <View style={styles.innerForm}>
          <MaterialCommunityIcons name="face-man-profile" size={40} color={iconColor} style={[styles.icon, {marginRight:10}]}/>
          <SubmitButton onPress={() => navigation.navigate('Profile')}>
            Profile Settings
          </SubmitButton>
        </View>

        <View style={styles.innerForm}>
          <AntDesignIcons name="infocirlceo" size={30} color={iconColor} style={[styles.icon, {marginRight: 20}]} />
          <SubmitButton onPress={() => navigation.navigate('About')}>
            About Us 
          </SubmitButton>
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
  },
  seperator: {
    height: 1,
    width: '80%',
    backgroundColor: 'gray',
    marginVertical: 0,
    marginTop: 100,
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
