import React from 'react';
import { FlatList, View, StyleSheet, ListRenderItem } from 'react-native';
import CardCarousel from '../components/CardCarousel'; // Asegúrate de importar correctamente
import RecentlyViewedCarousel from '../components/RecentlyViewedCarousel'; // Asegúrate de importar correctamente

// Definir el tipo para los elementos de la lista
interface DataItem {
  key: string;
  component: JSX.Element; // Usamos JSX.Element para los componentes React
}

const HomeScreen: React.FC = () => {
  const data: DataItem[] = [
    { key: 'recentlyViewed', component: <RecentlyViewedCarousel /> },
    { key: 'cardCarousel', component: <CardCarousel /> },
    // Si agregas más componentes, asegúrate de que estén correctamente tipados.
  ];

  // Renderizar el item de la lista
  const renderItem: ListRenderItem<DataItem> = ({ item }) => (
    <View>{item.component}</View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
