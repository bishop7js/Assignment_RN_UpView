import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import FavouriteListScreen from './screens/FavouriteListScreen';
import {MovieProvider} from './contexts/MovieContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MovieProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen 
              name="MovieDetail" 
              component={MovieDetailScreen}
              options={{ title: 'Movie Details' }}
            />
             <Stack.Screen 
              name="FavouriteList" 
              component={FavouriteListScreen}
              options={{ title: 'Favourites' }}
            />
          </Stack.Navigator>
        </MovieProvider>
          
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
