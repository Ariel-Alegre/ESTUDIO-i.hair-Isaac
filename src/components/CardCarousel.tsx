import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import { StackNavigationProp } from '@react-navigation/stack';

// Definimos el tipo de los datos de cada tarjeta
interface CardData {
  id: number;
  title: string;
  businessName: string;
  rating: number;
  type: string;
  address: string;
  image: string;
}

const carouselData: CardData[] = [
  {
    id: 1,
    title: 'Recomendado',
    businessName: 'Extension pestañas',
    rating: 4.5,
    type: 'Barbería',
    address: 'Av. Principal 123, Ciudad A',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcUef7cWD3uLU_G3k7Zbab66K4XFHObja2kw&s',
  },
  {
    id: 2,
    title: 'Recientemente Visto',
    businessName: 'Depilación',
    rating: 3.5,
    type: 'Salón de Belleza',
    address: 'Calle Secundaria 456, Ciudad B',
    image: 'https://f.hubspotusercontent20.net/hubfs/2356021/muebles-para-salon-de-belleza-mujer.jpg',
  },
  {
    id: 3,
    title: 'Tendencia',
    businessName: 'Microblading',
    rating: 5.0,
    type: 'Cejas y Pestañas',
    address: 'Plaza Central 789, Ciudad C',
    image: 'https://i.pinimg.com/originals/f5/6e/aa/f56eaa2cf4695914c548cfc722fb6585.jpg',
  },
];
type RootStackParamList = {
  Details: undefined; // Define the parameters for the Details screen if any
};
const CardCarousel = () => {
   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
 
   // Función para navegar a la pantalla 'Details'
   const goDetails = () => {
     navigation.navigate('Details'); // Navega a la pantalla Details
   };

  // Renderizamos cada tarjeta usando FlatList
  const renderItem = ({ item }: { item: CardData }) => (
    <TouchableOpacity style={styles.card} onPress={goDetails}> {/* Envolvemos con TouchableOpacity */}
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.businessName}
        </Text>
       {/*  <Text style={styles.cardRating}>{item.rating}</Text> */}
        <Text style={styles.cardAddress}>{item.address}</Text>
        <Text style={styles.cardSubtitle}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.sectionTitle}>Cabina</Text>
      <FlatList
        data={carouselData}
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

export default CardCarousel;
