import { useState, useEffect } from "react";

// The magic notebook hook.
function useLocalStorage(key, initialValue) {
    // Try to get the favorite recipe from LocalStorage when the app loads
    const[storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
                console.log(error);
                return initialValue;
            }
        });

        // This runs whenever the storedValue changes
        useEffect(() => {
            try {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.log(error)
            }
        }, [key, storedValue]);

        // Return the saved recipes and the function to update it
        return [storedValue, setStoredValue];
    }

export default useLocalStorage;