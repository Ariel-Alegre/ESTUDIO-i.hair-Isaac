import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import CardCarousel from '../components/CardCarousel'; // Asegúrate de importar correctamente
import RecentlyViewedCarousel from '../components/RecentlyViewedCarousel'; // Asegúrate de importar correctamente
import CardNewCarousel from '../components/CardNewCarousel';
import TrendCarousel from '../components/TrendCarousel';
import FilterCategory from '../components/FilterCategory';

const HomeScreen = () => {
  const data = [
    { key: 'recentlyViewed', component: <RecentlyViewedCarousel /> },
    { key: 'cardCarousel', component: <CardCarousel /> },
    { key: 'cardNewCarousel', component: <CardNewCarousel /> },
    { key: 'trendCarousel', component: <TrendCarousel /> },
    { key: 'filterCategory', component: <FilterCategory /> },
  ];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => item.component}
      keyExtractor={(item) => item.key}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
});

export default HomeScreen;
