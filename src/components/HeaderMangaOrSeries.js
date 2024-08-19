import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderMangaOrSeries = ({ mangaTitle, totalVideos }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mangaTitle}</Text>
      <Text style={styles.subtitle}>Nombre total de vidéos : {totalVideos}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
   borderBottomEndRadius:10,
   borderBottomLeftRadius:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
});

export default HeaderMangaOrSeries;
