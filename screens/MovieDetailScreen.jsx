import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { OMDB_API_KEY } from '@env';


const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${OMDB_API_KEY}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovieDetails(data);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading movie details...</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading movie details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: movieDetails.Poster !== 'N/A' 
              ? movieDetails.Poster 
              : 'https://via.placeholder.com/300x450'
          }}
          style={styles.poster}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movieDetails.Title}</Text>
        <Text style={styles.year}>({movieDetails.Year})</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>{movieDetails.imdbRating}/10</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Runtime:</Text>
          <Text style={styles.value}>{movieDetails.Runtime}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.value}>{movieDetails.Genre}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Director</Text>
          <Text style={styles.sectionContent}>{movieDetails.Director}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actors</Text>
          <Text style={styles.sectionContent}>{movieDetails.Actors}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plot Summary</Text>
          <Text style={styles.plotText}>{movieDetails.Plot}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posterContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  poster: {
    width: 250,
    height: 375,
    borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  year: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  plotText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default MovieDetailScreen;