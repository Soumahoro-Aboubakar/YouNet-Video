import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const VideoResults = ({ results , isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noResultsText}>Aucune vidéo trouvée</Text>
      </View>
    );
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultats de la recherche</Text>
      <FlatList
        data={results}
        keyExtractor={(item,id) => (item.videoId +id + + item.videoTitle).toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.videoTitle}</Text>
            <Text style={styles.itemDescription}>{item.videoDescription}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
});

export default VideoResults;
