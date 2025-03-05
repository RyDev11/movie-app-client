import PropTypes from 'prop-types';
import { Col, Card, Button } from 'react-bootstrap';
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
            comments: PropTypes.string.isRequired

        })
    }

    const { _id, title, director, year, description, genre, comments } = movieProp;

    return (
        <Col xs={12}>
            <Card className="movies-card text-center shadow-lg mx-3 my-3 border-0 rounded-0 " 
                style={{ width: "100%", minHeight: "350px", border: "1px solid #ddd", borderRadius: "10px" }}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title>
                        <Link to={`/movies/getMovie/${_id}`} className="text-dark text-decoration-none">
                            {title}
                        </Link>
                    </Card.Title>
                    <Card.Text className="">Director: {director} </Card.Text>
                    <Card.Text className="">Year: {year}</Card.Text>
                    <Card.Text className="">Description: {description}</Card.Text>
                    <Card.Text className="">Genre: {genre}</Card.Text>
                    <Card.Text className="">Comments: {comments}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-light">
                    <Link className="btn btn-primary details w-100 mt-2" to={`/movies/getMovie${_id}`}>Details</Link>
                </Card.Footer>
            </Card>
        </Col>
    )
}
