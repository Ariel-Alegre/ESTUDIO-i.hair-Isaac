import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { StackNavigationProp } from '@react-navigation/stack';


interface CardData {
  id: number;
  title: string;
  businessName: string;
  rating: number;
  type: string;
  address: string;
  image: string;
}

const recentlyViewedData: CardData[] = [
  {
    id: 1,
    title: 'Recientemente Visto',
    businessName: 'Glow Beauty Studio',
    rating: 4.8,
    type: 'Salón de Belleza',
    address: 'Av. Reforma 123, Ciudad X',
    image: 'https://images.fresha.com/locations/location-profile-images/806268/940973/ad801920-3200-4c6d-889e-c91c13b043c2.jpg?class=venue-gallery-large',
  },
  {
    id: 2,
    title: 'Recientemente Visto',
    businessName: 'Elite Barber Club',
    rating: 4.2,
    type: 'Barbería',
    address: 'Calle Palma 456, Ciudad Y',
    image: 'https://www.scalperstudio.com/wp-content/uploads/2022/03/sucursal-polanco-scalper-studio-barberia-cdmx.jpg',
  },
  {
    id: 3,
    title: 'Recientemente Visto',
    businessName: 'Lash & Brow Studio',
    rating: 4.9,
    type: 'Cejas y Pestañas',
    address: 'Plaza Dorada 789, Ciudad Z',
    image: 'https://i.pinimg.com/236x/c8/23/0f/c8230f6a01863c76cd2ce4628837addd.jpg',
  },
];


type RootStackParamList = {
  Details: undefined; // Define the parameters for the Details screen if any
};

const CardNewCarousel = () => {
 const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Función para navegar a la pantalla 'Details'
  const goDetails = () => {
    navigation.navigate('Details'); // Navega a la pantalla Details
  };

  const renderItem = ({ item }: { item: CardData }) => (
    <TouchableOpacity style={styles.card}  onPress={goDetails}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.businessName}
        </Text>
        <Text style={styles.cardRating}>⭐ {item.rating}</Text>
        <Text style={styles.cardAddress}>{item.address}</Text>
        <Text style={styles.cardSubtitle}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.sectionTitle}>Nuevos en ESTUDIO i.hair Isaac</Text>
      <FlatList
        data={recentlyViewedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={260} // Ajustado para alineación precisa
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

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
    paddingVertical: 4,
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

export default CardNewCarousel;
