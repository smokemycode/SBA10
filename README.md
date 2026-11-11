# 🍳 Recipe Discovery App

A React application for discovering recipes using [TheMealDB API](https://www.themealdb.com/).

## ✨ Features
- **Browse categories** on the home page (Beef, Chicken, Dessert, Seafood, etc.)
- **View recipes by category** — click a category to see all its recipes
- **View full recipe details** — image, ingredients with measurements, and cooking instructions
- **Search by name** — type in the navbar search box to find recipes
- **Save favorites** — add/remove recipes; they persist across browser sessions using `localStorage`
- **Favorites page** — see everything you've saved in one place
- **Loading & error states** — spinners and error messages everywhere the app talks to the API
- **Responsive** — works on mobile (the navbar wraps, cards resize)

## 🛠️ Tech Stack
- React (Vite)
- React Router DOM
- Custom hooks: `useFetch`, `useLocalStorage`
- Context API for global favorites state
- **Plain CSS** — no framework, just `index.css`

## 🚀 How to Run Locally
1. Clone this repo: `git clone <https://github.com/smokemycode/SBA10>`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open the URL shown in your terminal (usually `http://localhost:5173`)

## 📁 Project Structure
```
src/
├── components/       # Reusable UI pieces
│   ├── Navbar.jsx
│   ├── Spinner.jsx
│   └── ErrorMessage.jsx
├── context/
│   └── FavoritesContext.jsx   # Global favorites state + persistence
├── hooks/
│   ├── useFetch.js            # Generic data fetching hook
│   └── useLocalStorage.js     # Sync state with localStorage
├── pages/
│   ├── Home.jsx               # / - categories grid
│   ├── Category.jsx           # /category/:categoryName
│   ├── RecipeDetail.jsx       # /recipe/:recipeId
│   ├── Favorites.jsx          # /favorites
│   └── Search.jsx             # /search?query=...
├── App.jsx                    # Routes + Navbar
├── main.jsx                   # Wraps App in FavoritesProvider
└── index.css                  # All the styling
```
## 🧠 Reflection

### What was hardest?
The hardest part was definitely the Favorites page. I had a list of recipe IDs but needed the actual recipe details, so I had to make a small component that fetches each one individually. My first attempt was this: 
```
{favorites.map(id => {
  const { data } = useFetch(`...lookup.php?i=${id}`);
  return <RecipeCard data={data} />;
})}
``` 
I kept getting "Rendered fewer hooks than expected" errors and had no idea why. I googled it and learned about the Rules of Hooks, hooks must be called in the same order every render, so they can't go inside loops or .map callbacks.  Once I moved the fetch into a child component, it worked.

### A design decision I made
I kept favorites as an array of just IDs instead of full recipe objects. This means the data is small and persists easily, and I always fetch fresh recipe details. The trade-off is that the Favorites page makes several API calls instead of one, but it keeps things simple and always up to date. I also made `useFetch` generic — it takes any URL and returns `{ data, loading, error }`. I did this because I was hitting four different endpoints (categories, filter by category, lookup by ID, search). Instead of writing four near-identical fetch functions, I wrote one hook and reused it everywhere.

### Things I'd improve with more time
I'd move the inline styles into CSS classes because my index.css has some hacky selectors like `div[style*='grid']`. I'd also add a 'remove' button directly on each `FavoriteCard` so you don't have to click into the recipe first.