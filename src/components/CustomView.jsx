import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import {useTheme} from '@context/ThemeContext';

const CustomView = ({editable = false, value, name, fieldname, onChangeText}) => {
  const {isDarkMode} = useTheme();
  const themeStyles = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
    textColor: isDarkMode ? '#fff' : '#000',
    inputBackgroundColor: isDarkMode ? '#333' : '#f2f2f2',
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={[styles.label, {color: themeStyles.textColor}]}>{name}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: themeStyles.inputBackgroundColor,
            color: themeStyles.textColor,
          },
        ]}
        value={value}
        editable={editable}
        onChangeText={(text) => onChangeText(fieldname, text)}
      />
    </View>
  );
};

export default CustomView;

const styles = StyleSheet.create({
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
