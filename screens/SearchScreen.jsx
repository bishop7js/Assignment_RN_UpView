import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MovieContext } from '../contexts/MovieContext';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const { searchQuery, setSearchQuery, fetchMoviesList, moviesData } = useContext(MovieContext);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query);
      fetchMoviesList(query);
    }
  };

  const renderSearchInputForm = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Search Movies" 
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    );
  };

  const renderMoviesList = () => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Movies ({moviesData.length})</Text>
        <FlatList
          data={moviesData}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.movieItem}
              onPress={() => navigation.navigate('MovieDetail', { movie: item })}
            >
              <Image 
                source={{ uri: item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/100x150' }} 
                style={styles.moviePoster}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.Title}</Text>
                <Text style={styles.movieYear}>Year: {item.Year}</Text>
                <Text style={styles.movieType}>Type: {item.Type}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearchInputForm()}
      {moviesData.length > 0 && renderMoviesList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  movieItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  moviePoster: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 15,
  },
  movieDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  movieYear: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  movieType: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
});

export default SearchScreen;
