import { useSearchParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Search() {
	// Get the search parameters from the URL
	const [searchParams] = useSearchParams();
	const query = searchParams.get("query") || "";

	// Use the hook to search for the query
	const { data, loading, error } = useFetch(
		query
			? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
			: null
	);

	// No query, show a message
	if (!query) {
		return <p>Please enter a search term in the navbar.</p>;
	}

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message={error} />;

	const meals = data?.meals || [];

	if (meals.length === 0) {
		return <p>No recipes found for "{query}".</p>;
	}

	return (
		<div>
			<h1>Search Results for "{query}"</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
					gap: "20px",
					padding: "20px",
				}}>
				{meals.map((meal) => (
					<Link
						to={`/recipe/${meal.idMeal}`}
						key={meal.idMeal}
						style={{ textDecoration: "none", color: "black" }}>
						<div
							style={{
								border: "1px solid #ddd",
								borderRadius: "8px",
								padding: "10px",
								textAlign: "center",
							}}>
							<img
								src={meal.strMealThumb}
								alt={meal.strMeal}
								style={{
									width: "100%",
									height: "150px",
									objectFit: "cover",
									borderRadius: "4px",
								}}
							/>
							<h4>{meal.strMeal}</h4>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Search;
