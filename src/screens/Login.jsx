import {Image, StyleSheet, View, TouchableOpacity, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const Login = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    username: '',
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
      password: '',
    });
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyBoardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyBoardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyBoardDidShow.remove();
      keyBoardDidHide.remove();
    };
  }, []);

  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? '#000' : '#fff';
  return (
    <View style={[styles.container, {backgroundColor: theme}]}>
      {isKeyboardVisible? null : <AppIcon />}
      <CustomText style={{fontSize: 24, fontWeight: 'bold', color: 'gray'}}>
        Welcome Back!
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
          placeholder="Password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          isSecure={true}
        />
        <SubmitButton onPress={handleSubmit}>Login</SubmitButton>
      </View>
      <View style={styles.loginContainer}>
        <CustomText style={{color: 'gray'}}>Don't have account?</CustomText>
        {/* TODO: Add navigation to Login screen */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp') }>
          <CustomText style={styles.loginText}>Sign Up</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
