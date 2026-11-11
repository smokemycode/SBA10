import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Home() {
	const { data, loading, error } = useFetch(
		"https://www.themealdb.com/api/json/v1/1/categories.php",
	);

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message={error} />;

	const categories = data?.categories || [];

	return (
		<div>
			<h1>Recipe Categories</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
					gap: "20px",
					padding: "20px",
				}}>
				{categories.map((category) => (
					// Each category links to its page
					<Link
						to={`/category/${category.strCategory}`}
						key={category.idCategory}
						style={{ textDecoration: "none", color: "black" }}>
						<div
							style={{
								border: "1px solid #ddd",
								borderRadius: "8px",
								padding: "10px",
								textAlign: "center",
							}}>
							<img
								src={category.strCategoryThumb}
								alt={category.strCategory}
								style={{
									width: "100%",
									height: "100px",
									objectFit: "cover",
									borderRadius: "4px",
								}}
							/>
							<h3>{category.strCategory}</h3>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Home;
