import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ placeholder, value, onChangeText, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Input;
