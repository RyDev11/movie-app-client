import { useState, useEffect, useContext } from 'react';
import { Form,Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';


export default function AddMovie(){

    const notyf = new Notyf();

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ director, setDirector ] = useState("");
    const [ year, setYear] = useState("");
    const [ genre, setGenre ] = useState("");

    function createMovie(e){

        //prevent submit setDescriptionevent's default behavior
        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
                description: description,
                director: director,
                year: year,
                genre: genre

            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);
            if (data) {
                
                setTitle("")
                setDescription("");
                setDirector("");
                setYear("");
                setGenre("");

                notyf.success("Movie Added")
                navigate("/movies");                
            } else {

                notyf.error("Something Went Wrong.")
            }
        })
    }

    return (
    	
            
            <>
            <div className=" add-movie-container mx-auto mt-5">

                <h1 className="my-5 text-center">Add Movie</h1>
                <Form onSubmit={e => createMovie(e)}>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            required
                            value={title}
                            onChange={e => {setTitle(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            required
                            value={description}
                            onChange={e => {setDescription (e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Director</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Director"
                            required
                            value={director}
                            onChange={e => {setDirector (e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Year"
                            required
                            value={year}
                            onChange={e => {setYear (e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Genre"
                            required
                            value={genre}
                            onChange={e => {setGenre (e.target.value)}}
                        />
                    </Form.Group>
                
                    <Button variant="primary" type="submit" className="my-5">Add Movie</Button>
                    <Button variant="secondary" type="button" className="my-5 mx-2" onClick={() => navigate("/movies")}>Cancel</Button>
                </Form>
            </div>
            </>
           
    )
}



