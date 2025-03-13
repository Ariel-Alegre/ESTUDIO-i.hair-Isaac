import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
};

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  birthday: string;
  phone: string;
  position: string;


  
}

const ProfileScreen = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log(userData)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'No se encontró un token de sesión');
          navigation.navigate('Login');
          return;
        }

        const response = await axios.get('http://192.168.2.111:3001/api/user', {
          headers: { Authorization: token },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error obteniendo datos del usuario:', error);
        Alert.alert('Error', 'No se pudo obtener la información del perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información del usuario</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    {/* Avatar */}
    <Image source={{ uri: userData.avatar || 'https://via.placeholder.com/150' }} style={styles.avatar} />

    {/* Nombre */}
    <Text style={styles.name}>{userData.name} {userData.lastName}</Text>

 
    {/* Información específica según el rol */}
    {userData.role === 'cliente' ? (
      <View style={styles.roleContainer}>
       <Text style={styles.infoText}>📧 Email: {userData.email}</Text>
        <Text style={styles.infoText}>📅 Fecha de cumpleaños: {userData.birthday ?? 'No especificado'}</Text>
        <Text style={styles.infoText}>📱 WhatsApp: {userData.phone ?? 'No especificado'}</Text>
      </View>
    ) : (
      <View style={styles.roleContainer}>
<Text style={styles.infoText}>📧 Email: {userData.email}</Text>
<Text style={styles.infoText}>📱 WhatsApp: {userData.phone ?? 'No especificado'}</Text>
<Text style={styles.infoText}>💼 Profesión: {userData.position ?? 'No especificado'}</Text>

      </View>
    )}

    {/* Botón de cerrar sesión */}
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutText}>Cerrar sesión</Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  roleContainer: {
    padding: 15,
    borderRadius: 10,
    width: '90%',
    backgroundColor: '#f8f9fa',
    marginBottom: 20,
    alignItems: 'center',
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
export default ProfileScreen;
