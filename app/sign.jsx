import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './Common/Button';
import Input from './Common/Input';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // // Validate if all fields are filled
    // if (!name || !email || !phone || !password || !confirmPassword) {
    //   alert('Please fill in all fields');
    //   return;
    // }

    // Validate if password matches confirmPassword
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Create an object with the form data
    const formData = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    // Print the form data to console
    console.log(formData);

    // Navigate to Login screen
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp}  />
      <Text style={styles.loginText}  onPress={()=>{router.push('/login')}}>
        Already have an account? Login
      </Text>
      <Text style={styles.skipText}  onPress={()=>{router.push('/home')}}>
        Skip
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginText: {
    marginTop: 20,
    color: '#007BFF',
    textAlign: 'center',
  },
  skipText: {
    marginTop: 10,
    color: 'gray',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
