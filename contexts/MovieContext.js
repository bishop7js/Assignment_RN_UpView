import React, {createContext, useEffect, useState} from "react";
import { OMDB_API_KEY } from '@env';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [moviesData, setMoviesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [favourites, setFavourites] = useState([]);

    const fetchMoviesList = async (query, page = 1, appendResults = false) => {
        try {
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const response = await fetch(`http://www.omdbapi.com/?s=${query}&page=${page}&apikey=${OMDB_API_KEY}`);
            const data = await response.json(); 
            
            if (data.Response === "True") {
                if (appendResults) {
                    setMoviesData(prev => [...prev, ...data.Search]);
                } else {
                    setMoviesData(data.Search);
                }
                setTotalResults(parseInt(data.totalResults));
                setCurrentPage(page);
            } else {
                if (!appendResults) {
                    setMoviesData([]);
                }
            }
        } catch (error) {
            console.error("Error fetching movie data:", error);
            if (!appendResults) {
                setMoviesData([]);
            }
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMoreMovies = () => {
        if (searchQuery && !loadingMore && moviesData.length < totalResults) {
            fetchMoviesList(searchQuery, currentPage + 1, true);
        }
    };

        const loadFavouritesFromStorage = async () => {
        try {
            const storedFavourites = await AsyncStorage.getItem('favourites');
            if (storedFavourites !== null) {
                setFavourites(JSON.parse(storedFavourites));
            }
        } catch (error) {
            console.error('Error loading favourites:', error);
        }
    };

    const saveFavouritesToStorage = async () => {
        try {
            await AsyncStorage.setItem('favourites', JSON.stringify(favourites));
        } catch (error) {
            console.error('Error saving favourites:', error);
        }
    };

    useEffect(() => {
        loadFavouritesFromStorage();
    }, []);

    useEffect(() => {
        saveFavouritesToStorage();
    }, [favourites]);

    

    const value = {
        searchQuery,
        setSearchQuery,
        moviesData,
        setMoviesData,
        fetchMoviesList,
        loadMoreMovies,
        loading,
        loadingMore,
        totalResults,
        currentPage,
        favourites,
        setFavourites,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};