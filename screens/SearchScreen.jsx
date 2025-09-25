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
  Alert,
} from 'react-native';
import { MovieContext } from '../contexts/MovieContext';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  const {
    searchQuery,
    setSearchQuery,
    fetchMoviesList,
    moviesData,
    loadMoreMovies,
    loading,
    loadingMore,
    totalResults,
    favourites,
    setFavourites,
  } = useContext(MovieContext);

  useEffect(() => {
    if (!yearFilter.trim()) {
      setFilteredMovies(moviesData);
    } else {
      const filtered = moviesData.filter(movie =>
        movie.Year.includes(yearFilter),
      );
      setFilteredMovies(filtered);
    }
  }, [moviesData, yearFilter]);

  useEffect(() => {
    if (query.trim()) {
      const delayedSearch = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(delayedSearch);
    } else {
      setFilteredMovies([]);
      setYearFilter('');
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchQuery(query);
      fetchMoviesList(query, 1, false);
    }
  };

  const clearFilters = () => {
    setYearFilter('');
  };

  const handleAddToFavourite = movie => {
    Alert.alert(
      'Added to Favourites',
      `${movie.Title} has been added to your favourites!`,
      [{ text: 'OK' }],
    );
    setFavourites([...favourites, movie]);
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

        {query.trim() !== '' && moviesData.length > 0 && (
          <View style={styles.filterRow}>
            <TextInput
              placeholder="Filter by Year (e.g., 2020)"
              style={styles.yearInput}
              value={yearFilter}
              onChangeText={setYearFilter}
              keyboardType="numeric"
              maxLength={4}
            />
            {yearFilter !== '' && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Button title="Search" onPress={handleSearch} />
      </View>
    );
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
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            Movies ({filteredMovies.length}/{moviesData.length})
          </Text>
          {yearFilter && (
            <Text style={styles.filterInfo}>Filtered by: {yearFilter}</Text>
          )}
        </View>

        <FlatList
          data={filteredMovies}
          keyExtractor={item => item.imdbID}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItem}
              onPress={() =>
                navigation.navigate('MovieDetail', { movie: item })
              }
            >
              <Image
                source={{
                  uri:
                    item.Poster !== 'N/A'
                      ? item.Poster
                      : 'https://via.placeholder.com/100x150',
                }}
                style={styles.moviePoster}
              />
              <View style={styles.movieDetails}>
                <Text style={styles.movieTitle}>{item.Title}</Text>
                <Text
                  style={[
                    styles.movieYear,
                    yearFilter &&
                      item.Year.includes(yearFilter) &&
                      styles.highlightedYear,
                  ]}
                >
                  Year: {item.Year}
                </Text>
                <Text style={styles.movieType}>Type: {item.Type}</Text>

                <TouchableOpacity
                  style={styles.favouriteButton}
                  onPress={e => {
                    e.stopPropagation();
                    handleAddToFavourite(item);
                  }}
                >
                  <Text style={styles.favouriteButtonText}>
                    ⭐ Add to Favourite
                  </Text>
                </TouchableOpacity>
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

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Go to Favourites"
          onPress={() => navigation.navigate('FavouriteList')}
        />
      </View>

      {loading && renderLoadingIndicator()}

      {!loading && filteredMovies.length > 0 && renderMoviesList()}

      {!loading && query && filteredMovies.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            {yearFilter
              ? `No movies found for "${query}" in year ${yearFilter}`
              : `No movies found for "${query}"`}
          </Text>
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
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  yearInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8f9ff',
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listHeader: {
    marginBottom: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  filterInfo: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 2,
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
  highlightedYear: {
    color: '#007AFF',
    fontWeight: 'bold',
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
  disabledInput: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d0d0d0',
    color: '#999',
  },
  favouriteButton: {
    backgroundColor: '#f8eca6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  favouriteButtonText: {
    color: '#FF8C00',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SearchScreen;
