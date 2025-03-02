import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

type Category = {
  id: string;
  name: string;
  image: string;
};

const categories: Category[] = [
  { id: '1', name: 'Peluquerías', image: 'https://aromasfenpal.com/wp-content/uploads/2023/02/mejores-aromas-para-una-peluqueria-scaled.jpg' },
  { id: '2', name: 'Uñas', image: 'https://www.minutoneuquen.com/u/fotografias/m/2022/11/3/f1280x720-575141_706816_5050.jpg' },
  { id: '3', name: 'Cejas y pestañas', image: 'https://canalc.com.ar/wp-content/uploads/2021/07/cejas-y-pestanas.jpg' },
  { id: '4', name: 'Masajes', image: 'https://www.materialestetica.com/blog/wp-content/uploads/2022/11/beneficios-masajes-733.png' },
  { id: '5', name: 'Barbería', image: 'https://thebarbeer.co/wp-content/uploads/2018/05/barberia_06.jpg' },
  { id: '6', name: 'Depilación', image: 'https://www.clarin.com/img/2017/08/16/H1Cchgf_W_1200x0.jpg' },
  { id: '7', name: 'Faciales y cuidado de la piel', image: 'https://www.hola.com/horizon/square/5308f276a90b-gua-sha.jpg?im=Resize=(640),type=downsize' },
  { id: '8', name: 'Inyectables y botox', image: 'https://images.ctfassets.net/u4vv676b8z52/15yWmB9y7Rhn3BsiACmDK9/88b72b5adfeb03b0dbffa161f0370df4/botox-woman-1200x630-compressed.png?fm=jpg&q=80' },
  { id: '9', name: 'Cuerpo', image: 'https://img.freepik.com/fotos-premium/autocuidado-belleza-retrato-facial-mujer-negra-satisfecha-tratamiento-amor-propio-rutina-cuidado-piel-cosmetica-natural-dermatologia-maquillaje-lujo-nina-africana-feliz-brillo-piel-facial_590464-103664.jpg' },
  { id: '10', name: 'Tatuaje y piercing', image: 'https://vanidad.es/wp-content/uploads/2024/11/150810_photo-1475695752828-6d2b0a83cf8a.jpg' },
  { id: '11', name: 'Maquillaje', image: 'https://aprende.com/wp-content/uploads/2020/09/ejecuta-a-la-perfeccion-el-maquillaje-para-noche-940x580.jpg' },
  { id: '12', name: 'Médico y dental', image: 'https://alrea.com.mx/wp-content/uploads/especialista-endodoncia.jpg' },
  { id: '13', name: 'Asesoramiento y terapia holística', image: 'https://claudia.abril.com.br/wp-content/uploads/2024/04/terapia-holistica-metidacao.jpg?crop=1&resize=1212,909' },
  { id: '14', name: 'Fitness', image: 'https://cdn0.uncomo.com/es/posts/1/0/4/que_es_el_fitness_y_sus_beneficios_52401_orig.jpg' },
];

const CategoryList: React.FC = () => {
  const onSelectCategory = (category: Category) => {
    console.log('Seleccionaste:', category.name);
  };

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => onSelectCategory(item)}>
      {/* Asegúrate de que el texto esté dentro de <Text> */}
      <Text style={styles.text}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
 

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    margin: 5,
    height: 80,
  },
  image: {
    width: 80,
    height: '100%',
    borderRadius: 10,   
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    flexShrink: 1,
    paddingLeft: 10,
  },
});

export default CategoryList;
