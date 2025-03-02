import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';

// Importa los íconos (por ejemplo, desde react-icons)
import { Ionicons } from '@expo/vector-icons';  // Ejemplo con íconos de Ionicons

// Pantallas
import HomeScreen from '../screens/HomeScreen';
import SalonDetails from '../screens/DetailsScreen';

// Creación de los navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Pantalla de perfil de ejemplo
const ProfileScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Pantalla de Perfil</Text>
  </View>
);

// Navegación con Footer (Bottom Tabs)
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="¡Hola!">
        <Tab.Screen
          name="¡Hola!"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
            tabBarLabel: () => null, // Oculta el texto de la pestaña
            headerStyle: {
              backgroundColor: '#fff', // Color personalizado para la barra
              elevation: 0, // Elimina la sombra en la barra de navegación
              shadowOpacity: 0, // Elimina la sombra en iOS
            },
            headerTitleStyle: {
              fontSize: 24, // Tamaño de fuente del título
              fontWeight: 'bold',
            },
            headerTintColor: '#000', // Color de texto
            headerTitleAlign: 'left', // Alinear título a la izquierda en iOS
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
            tabBarLabel: () => null, // Oculta el texto de la pestaña
            headerShown: false, // Oculta el navbar (header)
          }}
        />
       
         <Tab.Screen
          name="Details"
          component={SalonDetails} // Asegúrate de que este componente esté importado correctamente
          initialParams={{ idBussiness: null }} 
          options={{
            tabBarButton: () => null, // Esto oculta completamente el botón de la pestaña en el footer

            tabBarIcon: () => null, // No mostrar ningún icono
            tabBarLabel: () => null, // Ocultar la etiqueta (texto) en la tab
            headerShown: false, // Oculta la cabecera
            tabBarStyle: { display: "none" }, // Ocultar la tab bar (footer)
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
