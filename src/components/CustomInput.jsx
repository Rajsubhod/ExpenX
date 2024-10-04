import {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({placeholder, isSecure = false, name, value, onChange}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={[styles.viewBox, {borderColor: isFocused ? 'tomato' : 'gray'}]}>
      <TextInput
        style={[styles.inputBox]}
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        secureTextEntry={isSecure && !isPasswordVisible}
        value={value}
        onChangeText={(text) => onChange(name, text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isSecure ? (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <MaterialCommunityIcons
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  viewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    marginVertical: 10,
  },
  inputBox: {
    flex: 1,
    color: 'tomato'
  },
});
