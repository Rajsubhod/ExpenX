import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native'; // Using Linking from 'react-native'
import React, { useCallback } from 'react';
import { useTheme } from '@context/ThemeContext';
import CustomText from '@components/CustomText';
import { useFocusEffect } from '@react-navigation/native';

const About = ({navigation}) => {
  const { isDarkMode } = useTheme();
  const viewColor = isDarkMode ? '#000' : '#fff';

  // Function to handle opening the GitHub link
  const handlePress = () => {
    Linking.openURL('https://github.com/rajsubhod');
  };

  return (
    <View style={[styles.home, { backgroundColor: viewColor }]}>
      <CustomText style={[{color: 'gray'}]}>Thanks for using our App</CustomText>
      <Text style={[{color: 'tomato'}]}>Version 1.0.0</Text>
      <View style={styles.textContainer}>
        <Text style={[{color: 'gray'}]}>
          This app is developed by <Text style={{ fontWeight: 'bold', color: 'gray', fontWeight: '900' }}>Rajdeep</Text>
        </Text>
        {/* Touchable area for the GitHub link */}
        <TouchableOpacity onPress={handlePress}>
          <Text style={{ fontWeight: 'bold', color: 'gray', textDecorationLine: 'underline' }}>
            Visit my GitHub: github.com/rajsubhod
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});
