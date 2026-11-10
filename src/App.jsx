import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import Search from './pages/Search';

// This is the main door to the Recipe app. Pages will be here later.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The path "/" means the home page. */}
        <Route path="/" element={<Home />} />
        {/* ":categoryName" is a variable. It will match /category/Seafood */}
        <Route path="/category/:categoryName" element={<Category />} />
        {/* ":recipeId" is a variable for the recipe's ID */}
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        {/* A static page for favorites */}
        <Route path="/favorites" element={<Favorites />} />
        {/* A page for search results. */}
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;