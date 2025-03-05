import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Notyf } from "notyf";
import UserContext from "../context/UserContext";

export default function MovieView() {
    const { user } = useContext(UserContext);
    const { movieId } = useParams();
    const notyf = new Notyf();

    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovie/${movieId}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setMovie(data);
                } else {
                    setError("Movie not found.");
                }
            })
            .catch(() => {
                setError("Failed to load movie details.");
                notyf.error("Failed to load movie details.");
            });
    }, [movieId]);

    if (error) {
        return (
            <Container className="mt-5 text-center">
                <h2 className="text-danger">{error}</h2>
                <Link to="/movies" className="btn btn-dark mt-3">Go Back to Movies</Link>
            </Container>
        );
    }

    if (!movie) {
        return (
            <Container className="mt-5 text-center">
                <h2>Loading movie details...</h2>
            </Container>
        );
    }


        // Set a default image path for all movies
    const imagePath = "/images/default-movie.jpg"; 

    return (
        <Container className="mt-5 movie-view-page">
            <Row>
                <Col lg={{ span: 8, offset: 2 }}>
                    <Card className="movie-card shadow-lg border-0 rounded-0">
                    	<Card.Img 
                            variant="top" 
                            src={imagePath} 
                            alt="Movie Poster" 
                            className="movie-view-image"
                        />
                        <Card.Body className="text-center">
                            <Card.Title className="fw-bold">{movie.title}</Card.Title>
                            <Card.Subtitle className="text-muted">Directed by: {movie.director}</Card.Subtitle>
                            <Card.Text>Year: {movie.year}</Card.Text>
                            <Card.Text>Genre: {movie.genre}</Card.Text>
                            <Card.Text className="fw-bold">Description:</Card.Text>
                            <Card.Text>{movie.description}</Card.Text>

                            {/* Comments Section */}
                            <Card.Text className="fw-bold mt-4 movie-comments">Comments:</Card.Text>
                            {Array.isArray(movie.comments) && movie.comments.length > 0 ? (
                                <ul className="list-unstyled">
                                    {movie.comments.map((commentObj) => (
                                        <li key={commentObj._id} className="border-bottom py-2">
                                            <strong>User {commentObj.userId}:</strong> {commentObj.comment}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments available.</p>
                            )}

                            <Link to="/movies" className="btn btn-dark mt-3">Back to Movies</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
