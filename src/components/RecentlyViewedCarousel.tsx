import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios'; // Asegúrate de tener instalado axios

// Tipo de datos para las tarjetas
interface CardData {
  id: number;
  nombre: string;
  direccion: string;
  imagen: string[]; // Asumiendo que 'imagen' es un array de strings
  tipo: string;
  rating: number;
}

// Define la navegación
type RootStackParamList = {
  Details: { idBussiness: number };
};

const RecentlyViewedCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [businessData, setBusinessData] = useState<CardData[]>([]);

  // Obtener los datos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: CardData[] }>('https://panel-estudio-production.up.railway.app/api/all-bussiness');
        setBusinessData(response.data.data); // Ajusta al formato de respuesta
      } catch (error) {
        console.error('Error al obtener los negocios:', error);
      }
    };
    fetchData();
  }, []);

  // Función para navegar a la pantalla 'Details'
  const goDetails = (id: number) => {
    navigation.navigate('Details', { idBussiness: id });
  };

  // Renderizar cada tarjeta
  const renderItem = ({ item }: { item: CardData }) => (
    <TouchableOpacity style={styles.card} onPress={() => goDetails(item.id)}>
      <Image source={{ uri: item?.imagen[0] }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.nombre}
        </Text>
        {/* <Text style={styles.cardRating}>{item.rating}</Text> */}
        <Text style={styles.cardAddress}>{item.direccion}</Text>
        <Text style={styles.cardSubtitle}>{item.tipo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.sectionTitle}>Compartir tiempo</Text>
      <FlatList
        data={businessData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={260}
        pagingEnabled // ← Esta línea ayuda a mantener la misma experiencia en ambas plataformas
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    width: 250,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'grey',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222',
  },
  cardRating: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  cardAddress: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    alignSelf: 'flex-start',
    color: '#555',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default RecentlyViewedCarousel;
