import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useTheme} from '@context/ThemeContext';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useAuth } from '@context/AuthContext';

const Profile = () => {
  const {userId, accessToken} = useAuth();
  const {isDarkMode} = useTheme();
  const themeStyles = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
    textColor: isDarkMode ? '#fff' : '#000',
    inputBackgroundColor: isDarkMode ? '#333' : '#f2f2f2',
  };

  const [formValues, setFormValues] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  // Handler to update form values
  const handleInputChange = (name, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // ?? Either in login when user logsin we sen the backend to return the user data
  // ?? or we can create a new endpoint to get user data but then we need to store the user id in the Authcontext 

  const getUserData = async () => {
    const data = await fetch('http://192.168.0.105:8081/user/',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Requested-With': 'XMLHttpRequest',
        'userId': userId
      },
    })

    const userData = await data.json();
    console.log('User data:', userData);
    return userData;
  };


  useEffect(() => {
    // Fetch user data from API
    const handleSettingUserData = async () => {
      try{
        const userData = await getUserData();
        setFormValues({
          username: userData.username || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
        })

      }catch(error){
        console.log('Error setting user data:', error);
      }
    };
    handleSettingUserData();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: themeStyles.backgroundColor},
      ]}>
      {/* Username */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, {color: themeStyles.textColor}]}>
          Username
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          value={formValues.username}
          editable={false} // Username is not editable
        />
      </View>

      {/* First Name */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, {color: themeStyles.textColor}]}>
          First Name
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          value={formValues.firstName}
          onChangeText={value => handleInputChange('firstName', value)}
        />
      </View>

      {/* Last Name */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, {color: themeStyles.textColor}]}>
          Last Name
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          value={formValues.lastName}
          onChangeText={value => handleInputChange('lastName', value)}
        />
      </View>

      {/* Email */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, {color: themeStyles.textColor}]}>
          Email
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          value={formValues.email}
          keyboardType="email-address"
          onChangeText={value => handleInputChange('email', value)}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, {color: themeStyles.textColor}]}>
          Phone Number
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          value={formValues.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={value => handleInputChange('phoneNumber', value)}
        />
      </View>

      {/* Password */}
      <View style={styles.fieldContainer}>
        <Text style={[styles.label, {color: themeStyles.textColor}]}>
          Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          value={formValues.password}
          secureTextEntry={true} // Mask the password
          onChangeText={value => handleInputChange('password', value)}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
