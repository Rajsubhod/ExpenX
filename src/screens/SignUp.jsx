import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  
} from 'react-native';
import React, {useState} from 'react';
import CustomText from '@components/CustomText';
import {useTheme} from '@context/ThemeContext';
import CustomInput from '@components/CustomInput';
import SubmitButton from '@components/SubmitButton';

const AppIcon = () => (
  <Image
    source={require('../assets/accounting_light.png')}
    style={{width: 80, height: 80, marginRight: -10, marginBottom: 50}}
    tintColor={'tomato'}
  />
);

const SignUp = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted with values:', formValues);
    // Handle form submission

    // Clear form values
    setFormValues({
      username: '',
      email: '',
      password: '',
    });
  };

  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? '#000' : '#fff';
  return (
    <View style={[styles.container, {backgroundColor: theme}]}>
      <AppIcon />
      <CustomText style={{fontSize: 24, fontWeight: 'bold', color: 'gray'}}>
        Sign Up
      </CustomText>
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
        <SubmitButton onPress={handleSubmit}>Sign Up</SubmitButton>
      </View>
      <View style={styles.loginContainer}>
        <CustomText style={{color: 'gray'}}>
          Already have an account?
        </CustomText>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <CustomText style={styles.loginText}>Login</CustomText>
        </TouchableOpacity>
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: 'tomato',
    paddingLeft: 10,
  },
});
