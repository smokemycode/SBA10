import useFetch from "./hooks/useFetch"

// This is the main door to the Recipe app. Pages will be here later.
function App() {
  const { data, loading, error } = useFetch('https://www.themealdb.com/api/json/v1/1/categories.php');

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>It Works!</h1>
      {data && data.categories && (
        <p>First category: {data.categories[0].strCategory}</p>
      )}
    </div>
  );
}

export default App;