import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MovieCard({ movieProp }) {
    MovieCard.propTypes = {
        movieProp: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
            year: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
            comments: PropTypes.array
        })
    };

    const { _id, title, director, year, description, genre } = movieProp;

    return (
        <Card className="movies-card text-center shadow-lg mx-3 my-3 border-0 rounded-0" 
            style={{ width: "100%", minHeight: "350px", border: "1px solid #ddd", borderRadius: "10px" }}>
            
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>
                    <Link to={`/movies/${_id}`} className="text-dark text-decoration-none">
                        {title}
                    </Link>
                </Card.Title>
                <Card.Text>Director: {director} </Card.Text>
                <Card.Text>Year: {year}</Card.Text>
                <Card.Text>Genre: {genre}</Card.Text>
                <Card.Text>Description: {description.substring(0, 100)}...</Card.Text>

                <Button as={Link} to={`/movies/${_id}`} variant="primary" className="mt-2">
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
}
