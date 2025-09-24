import React, {createContext, useEffect, useState} from "react";
import { OMDB_API_KEY } from '@env';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [moviesData, setMoviesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchMoviesList = async (query) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
            const data = await response.json(); 
            if (data.Response === "True") {
                setMoviesData(data.Search); 
            } else {
                setMoviesData([]); 
            }
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    }

    const value = {
        searchQuery,
        setSearchQuery,
        moviesData,
        setMoviesData,
        fetchMoviesList  
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
}