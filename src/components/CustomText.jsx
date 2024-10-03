import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '@components/ThemeContext'; // Import the useTheme hook

const CustomText = ({ children, style, ...props }) => {
    const {isDarkMode} = useTheme();
    const textColor = isDarkMode ? '#fff' : '#000';

    return (
    <Text style={[styles.text, { color: textColor }, style]} {...props}>
        {children}
    </Text>
    );
};

export default CustomText;

const styles = StyleSheet.create({
    text: {

    },
});