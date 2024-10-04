import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '@components/CustomText';
import {useTheme} from '@components/ThemeContext';
import WelcomeButton from '@components/WelcomeButton';
import { useNavigation } from '@react-navigation/native';

const AppIcon = () => (
  <Image
    source={require('../assets/accounting_light.png')}
    style={{width: 80, height: 80, marginRight: 10, marginBottom: 50}}
    tintColor={'tomato'}
  />
);


const Welcome = () => {
  const {isDarkMode} = useTheme();
  const theme = isDarkMode ? '#000' : '#fff';

  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme}}>
      <AppIcon />
      <CustomText style={styles.text}> Welcome! To</CustomText>
      <CustomText style={{fontSize: 25, color: 'tomato', paddingBottom: 200, fontfamily: ''}}>
        finco
      </CustomText>
      <WelcomeButton onPress={() => navigation.navigate('Login')}/>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
