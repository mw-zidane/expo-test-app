import React, { useState } from 'react';
import {
  Alert,
  Appearance,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    placeOfBirth: '',
    schoolName: '',
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(
    Appearance.getColorScheme() || 'light'
  );
  const isDark = theme === 'dark';

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    const { name, email, password, age, placeOfBirth, schoolName } = form;
    if (!name || !email || !password || !age || !placeOfBirth || !schoolName) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.137.251:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message || 'Form submitted successfully');
        setForm({
          name: '',
          email: '',
          password: '',
          age: '',
          placeOfBirth: '',
          schoolName: '',
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to submit form');
      }
      console.log('Form submitted:', form);
      console.log('Response:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>React Native Form</Text>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Text style={styles.toggleButtonText}>
          Switch to {isDark ? 'Light' : 'Dark'} Theme
        </Text>
      </TouchableOpacity>

      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter your name"
        placeholderTextColor={isDark ? '#ccc' : '#666'}
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter your email"
        placeholderTextColor={isDark ? '#ccc' : '#666'}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter your password"
        placeholderTextColor={isDark ? '#ccc' : '#666'}
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter your age"
        placeholderTextColor={isDark ? '#ccc' : '#666'}
        keyboardType="numeric"
        value={form.age}
        onChangeText={(text) => handleChange('age', text)}
      />
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter your place of birth"
        placeholderTextColor={isDark ? '#ccc' : '#666'}
        value={form.placeOfBirth}
        onChangeText={(text) => handleChange('placeOfBirth', text)}
      />
      <TextInput
        style={[styles.input, isDark && styles.inputDark]}
        placeholder="Enter your school's name"
        placeholderTextColor={isDark ? '#ccc' : '#666'}
        value={form.schoolName}
        onChangeText={(text) => handleChange('schoolName', text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  containerDark: {
    backgroundColor: '#1f2937',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
  },
  titleDark: {
    color: '#f9fafb',
  },
  input: {
    height: 48,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#111827',
    fontSize: 16,
  },
  inputDark: {
    backgroundColor: '#374151',
    borderColor: '#4b5563',
    color: '#f9fafb',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  toggleButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButtonText: {
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default HomeScreen;
