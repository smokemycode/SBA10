import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Favorites() {
	const { favorites } = useFavorites();

	// If there are no favorites, show a message
	if (favorites.length === 0) {
		return (
			<div style={{ textAlign: "center", padding: "50px" }}>
				<h2>No favorites yet!</h2>
				<p>Browse recipes and click "Add to Favorites" to see them here.</p>
				<Link to="/">Go to Home</Link>
			</div>
		);
	}

	// If there are favorites, display them
	return (
		<div>
			<h1>Your Favorite Recipes</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
					gap: "20px",
					padding: "20px",
				}}>
				{favorites.map((id) => (
					// Pass the ID to a child component to fetch its details.
					<FavoriteCard key={id} recipeId={id} />
				))}
			</div>
		</div>
	);
}

function FavoriteCard({ recipeId }) {
	const { data, loading, error } = useFetch(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
	);

	if (loading) return <Spinner />;
	if (error) return <p>Error loading recipe.</p>;

	const meal = data?.meals?.[0];
	if (!meal) return null; // Just in case the recipe doesn't exist

	return (
		<Link
			to={`/recipe/${meal.idMeal}`}
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
	);
}

export default Favorites;
