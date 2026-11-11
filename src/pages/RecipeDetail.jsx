import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function RecipeDetail() {
	const { recipeId } = useParams();
	// Fetch the recipe details using the ID from the URL
	const { data, loading, error } = useFetch(
		`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
	);
	// Get the favorite tools from the context
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message={error} />;

	// Getting the first object from the "meals" array
	const meal = data?.meals?.[0];
	if (!meal) return <p>Recipe not found.</p>;

	// Check if the recipe is a favorite
	const favorited = isFavorite(meal.idMeal);

	const handleFavoriteToggle = () => {
		if (favorited) {
			removeFavorite(meal.idMeal);
		} else {
			addFavorite(meal.idMeal);
		}
	};

	// Helper to display ingredients
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];
		if (ingredient && ingredient.trim() !== "") {
			ingredients.push(`${measure} ${ingredient}`);
		}
	}

	return (
		<div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
			<h1>{meal.strMeal}</h1>
			<img
				src={meal.strMealThumb}
				alt={meal.strMeal}
				style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
			/>

			{/* The FAVORITES BUTTON */}
			<div style={{ margin: "20px 0" }}>
				<button
					onClick={handleFavoriteToggle}
					style={{
						padding: "10px 20px",
						fontSize: "16px",
						backgroundColor: favorited ? "#ff4d4d" : "#4CAF50",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}>
					{favorited ? "Remove from Favorites" : "Add to Favorites"}
				</button>
			</div>

			<h2>Ingredients</h2>
			<ul>
				{ingredients.map((ing, index) => (
					<li key={index}>{ing}</li>
				))}
			</ul>

			<h2>Instructions</h2>
			<p style={{ whiteSpace: "pre-wrap" }}>{meal.strInstructions}</p>
		</div>
	);
}

export default RecipeDetail;
