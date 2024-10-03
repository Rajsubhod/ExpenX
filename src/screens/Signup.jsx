import {Image, TextInput, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '@components/CustomText';
import {useTheme} from '@components/ThemeContext';
import WelcomeButton from '@components/WelcomeButton';
import CustomInput from '@components/CustomInput';
import SubmitButton from '@components/SubmitButton';

const AppIcon = () => (
  <Image
    source={require('../assets/accounting_light.png')}
    style={{width: 80, height: 80, marginRight: 10, marginBottom: 50}}
    tintColor={'tomato'}
  />
);

const SignUp = () => {
  const [formValues, setFormValues] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormValues({
      ...formValues, 
      [name]: value
    });
  }

  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? '#000' : '#fff';
  return (
    <View style={[styles.container, {backgroundColor: theme}]}>
      <AppIcon />
      <View style={styles.form}>
        <CustomInput
          style={styles.input}
          placeholder="Username"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
        />
        <CustomInput
          style={styles.input}
          placeholder="Email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <CustomInput
          style={styles.input}
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          isSecure={true}
        />
        <SubmitButton />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 80,
    height: 80,
  },
  form: {
    marginTop: 150,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
});
