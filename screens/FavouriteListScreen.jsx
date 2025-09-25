import React, {useContext} from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { MovieContext } from '../contexts/MovieContext';

const FavouriteListScreen = () => {

    const { favourites } = useContext(MovieContext);

    const renderFavouriteMoviesList = () => {
        if (!favourites || favourites.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No favourite movies yet</Text>
                    <Text style={styles.emptySubText}>Start adding movies to your favourites!</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={favourites}
                keyExtractor={(item) => item.imdbID}
                renderItem={({ item }) => (
                    <View style={styles.movieItem}>
                        <Image 
                            source={{ 
                                uri: item.Poster !== 'N/A' 
                                    ? item.Poster 
                                    : 'https://via.placeholder.com/100x150'
                            }} 
                            style={styles.moviePoster}
                        />
                        <View style={styles.movieDetails}>
                            <Text style={styles.movieTitle}>{item.Title}</Text>
                            <Text style={styles.movieYear}>Year: {item.Year}</Text>
                            <Text style={styles.movieType}>Type: {item.Type}</Text>
                        </View>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        );
    }

    console.log("Favourites List:", favourites);

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>My Favourites</Text>
            {renderFavouriteMoviesList()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    listContainer: {
        paddingHorizontal: 20,
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
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    moviePoster: {
        width: 80,
        height: 120,
        borderRadius: 8,
        marginRight: 15,
    },
    movieDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    movieYear: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    movieType: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
});

export default FavouriteListScreen;