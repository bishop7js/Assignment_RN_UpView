import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MovieContext } from '../contexts/MovieContext';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const { 
    setSearchQuery, 
    fetchMoviesList, 
    moviesData, 
    loadMoreMovies,
    loading,
    loadingMore,
    totalResults 
  } = useContext(MovieContext);

  useEffect(() => {
    if (query.trim()) {
      const delayedSearch = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(delayedSearch);
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query);
      fetchMoviesList(query, 1, false); 
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.footerText}>Loading more movies...</Text>
      </View>
    );
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

  const renderLoadingIndicator = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Searching movies...</Text>
      </View>
    );
  };

  const renderMoviesList = () => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>
          Movies ({moviesData.length}/{totalResults})
        </Text>
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
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearchInputForm()}
      
      {loading && renderLoadingIndicator()}
      
      {!loading && moviesData.length > 0 && renderMoviesList()}
      
      {!loading && query && moviesData.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No movies found for "{query}"</Text>
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default SearchScreen;
