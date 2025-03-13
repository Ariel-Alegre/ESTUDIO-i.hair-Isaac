import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
type RootStackParamList = {
  Perfil: undefined; // Pantalla a la que navegará después del login
};

const Login = () => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!code) {
      Alert.alert('Error', 'Por favor ingrese el código');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.2.111:3001/api/login', { code });

      const { token } = response.data;
      console.log('Login exitoso', response.data);

      // Guardar token en AsyncStorage
      await AsyncStorage.setItem('token', token);

      // Redirigir al perfil
      navigation.navigate('Perfil');
    } catch (error) {
      console.error('Error al hacer login', error);
      Alert.alert('Error', 'Código incorrecto o problema con el servidor');
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />

      {/* Título */}
      <Text style={styles.title}>Bienvenido</Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu código"
        placeholderTextColor="#AAA"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
      />

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Iniciar sesión</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Negro elegante
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semitransparente
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#000', // Rojo Netflix (puedes cambiarlo)
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
