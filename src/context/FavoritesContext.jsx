import { createContext, use, useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage';

// Puts the favorites data on the bulletin board
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    // Uses the magic notebook
    const [favorites, setFavorites] = useLocalStorage('recipe-favorites', []);

    // Adds an ID to the favorites list
    const addFavorite = (recipeId) => {
        // Makes sure we have no duplicates
        if (!favorites.includes(recipeId)) {
            // If not add it to the list
            setFavorites([...favorites, recipeId]);
        }
    };

    // Removes an ID from the list
    const removeFavorite = (recipeId) => {
        // Keep only the IDs that are not being removed
        setFavorites(favorites.filter(id => id !== recipeId));
    };

    // Checks if a recipe is a favorite
    const isFavorite = (recipeId) => {
        return favorites.includes(recipeId);
    };

    // The "values" we put on the bulletin board
    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    };

    // Passes this down to the children
    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

// Custom Hook
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}