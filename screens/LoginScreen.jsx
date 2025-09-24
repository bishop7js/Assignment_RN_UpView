import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (username === 'upview' && password === 'upview') {
        Alert.alert('Success', 'Welcome to UPView!', [
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Search'),
          },
        ]);
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🎬</Text>
            <Text style={styles.appName}>UPView</Text>
            <Text style={styles.tagline}>Movie Discovery App</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to discover amazing movies</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#8E8E93"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loginButtonText}>Signing in...</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.credentialsContainer}>
            <Text style={styles.credentialsText}>
              Test Credentials: username: upview, password: upview
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Discover • Watch • Enjoy</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2C5DFF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#6C7B7F',
    marginTop: 5,
    fontStyle: 'italic',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C5DFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C7B7F',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C5DFF',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E1E5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#2C5DFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#B0C4FF',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  credentialsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E5F7',
  },
  credentialsText: {
    fontSize: 14,
    color: '#2C5DFF',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6C7B7F',
    fontStyle: 'italic',
  },
});

export default LoginScreen;