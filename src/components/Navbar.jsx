import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/search?query=${searchTerm}`);
			setSearchTerm("");
		}
	};

	return (
		<nav
			style={{
				padding: "10px",
				borderBottom: "2px solid #ccc",
				marginBottom: "20px",
			}}>
			<Link to="/" style={{ marginRight: "15px" }}>
				Home
			</Link>
			<Link to="/favorites" style={{ marginRight: "15px" }}>
				Favorites
			</Link>
			<form onSubmit={handleSearch} style={{ display: "inline" }}>
				<input
					type="text"
					placeholder="Search recipes..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					style={{ marginRight: "5px" }}
				/>
				<button type="submit">Search</button>
			</form>
		</nav>
	);
}

export default Navbar;