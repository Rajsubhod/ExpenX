import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {useTheme} from '@context/ThemeContext';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {useAuth} from '@context/AuthContext';
import CustomSelector from '@components/CustomSelector';
import CustomButtom from '@components/CustomButtom';
import {useFocusEffect} from '@react-navigation/native';
import CustomView from '@components/CustomView';
import {constants} from 'Constants';

const Profile = ({navigation}) => {
  const {userId, accessToken} = useAuth();
  const {isDarkMode} = useTheme();
  const themeStyles = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
    textColor: isDarkMode ? '#fff' : '#000',
    inputBackgroundColor: isDarkMode ? '#333' : '#f2f2f2',
  };

  const [isEditable, setIsEditable] = useState(false); // Control editability of inputs
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true); // Control Confirm button

  const [formValues, setFormValues] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });

  // Handler to update form values
  const handleInputChange = (name, value) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    console.log('Form values:', formValues);
    setIsConfirmDisabled(false); // Enable Confirm button
  };

  // const userId = 'e5d04605-9869-4fd0-bfd6-03648757973f';

  // Handler to update user data
  const getUserData = async () => {
    const data = await fetch(constants.FETCH_USER_DETAILS, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    const userData = await data.json();
    console.log('User data:', userData);
    return userData;
  };

  // Handler for update button
  const handleUpdate = () => {
    setIsEditable(true); // Enable input fields for editing
  };

  // Handler for confirm button
  const handleConfirm = async () => {
    console.log('Confirmed changes:', formValues);
    // Call API to update user data
    try {
      const response = await fetch(constants.UPDATE_USER_DETAILS, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          email: formValues.email,
          phone_number: formValues.phone_number,
        }),
      });
      if (response.ok) {
        console.log('User data updated successfully');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.log('Error updating user data:', error);
    }
    setIsEditable(false); // Lock input fields again after confirming
    setIsConfirmDisabled(true); // Disable Confirm button
    navigation.navigate('Setting'); // Navigate back to Setting screen
  };

  // Handle screen focus/unfocus state
  useFocusEffect(
    useCallback(() => {
      // Lock input fields and disable confirm button when screen is focused
      setIsEditable(false);
      setIsConfirmDisabled(true);

      const fetchUserData = async () => {
        try {
          const userData = await getUserData();
          setFormValues({
            username: userData.username || '',
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            phone_number: userData.phone_number || '',
          });
        } catch (error) {
          setFormValues({
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
          });
          console.log('Error re-fetching user data:', error);
        }
      };

      fetchUserData(); // Call the async function to fetch user data

      // Cleanup function when screen becomes unfocused
      return () => {
        setIsEditable(false); // Lock the fields again
        setIsConfirmDisabled(true); // Disable Confirm button
      };
    }, []),
  );

  useEffect(() => {
    // Fetch user data from API
    const handleSettingUserData = async () => {
      try {
        const userData = await getUserData();
        setFormValues({
          username: userData.username || '',
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          email: userData.email || '',
          phone_number: userData.phone_number || '',
        });
      } catch (error) {
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
      <CustomView
        name={'Username'}
        fieldname="username"
        value={formValues.username}
      />

      {/* First Name */}
      <CustomView
        name={'First Name'}
        value={formValues.first_name}
        editable={isEditable}
        fieldname="first_name"
        onChangeText={handleInputChange}
      />

      {/* Last Name */}
      <CustomView
        name={'Last Name'}
        value={formValues.last_name}
        editable={isEditable}
        fieldname="last_name"
        onChangeText={handleInputChange}
      />

      {/* Email */}
      <CustomView
        name={'Email'}
        value={formValues.email}
        editable={isEditable}
        fieldname="email"
        onChangeText={handleInputChange}
      />

      {/* Phone Number */}
      <CustomView
        name={'Phone Number'}
        value={formValues.phone_number}
        editable={isEditable}
        fieldname="phone_number"
        onChangeText={handleInputChange}
      />

      {/* Buttons */}
      <View style={styles.buttons}>
        <CustomButtom onPress={handleUpdate}>Update</CustomButtom>
        <CustomButtom
          onPress={handleConfirm}
          disabled={isConfirmDisabled} // Disable Confirm if no changes
        >
          Confirm
        </CustomButtom>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
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
  buttoms: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
});
