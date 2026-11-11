import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Category() {
	// Get the category name from the URL
	const { categoryName } = useParams();
	// Use the hook to fetch recipes for the category
	const { data, loading, error } = useFetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
	);

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message={error} />;

	const meals = data?.meals || [];

	return (
		<div>
			<h1>Category: {categoryName}</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
					gap: "20px",
					padding: "20px",
				}}>
				{meals.map((meal) => (
					// Link to the recipe detail page using the meal's ID.
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
export default Category;
