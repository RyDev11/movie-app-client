import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";


export default function Movies() {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch all movies
  const fetchData = async () => {
    setLoading(true);
    setError("");

    const fetchUrl = `${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`;

    try {
      const res = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      console.log("Fetched Data:", data); // Debugging output

      if (Array.isArray(data)) {
        setMovies(data);
      } else if (data.movies && Array.isArray(data.movies)) {
        setMovies(data.movies);
      } else {
        setMovies([]); // No movies available
        setError(data.message || "No movies found.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
      setError("Failed to load movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <Container className="my-4 text-center">
      <h1>Explore Movies and TV Shows</h1>

      {loading ? (
        <p>Loading movis...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : movies.length > 0 ? (
        <Row className="g-4 mt-4">
          {movies.map((movie) => (
            <Col key={movie._id} xs={12} sm={6} md={4}>
              <MovieCard movieProp={movie} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No movies available.</p>
      )}
    </Container>
  );
}
