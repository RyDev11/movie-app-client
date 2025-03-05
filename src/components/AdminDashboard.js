import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import EditProduct from "./EditProduct";
// import ArchiveProduct from './ArchiveProduct';



export default function AdminDashboard({ moviesData, fetchData }) {


    const [movies, setMovies] = useState([])
    const navigate = useNavigate();

    //Getting the moviesData from the movies page
    useEffect(() => {
        console.log(moviesData);

        const moviesArr = moviesData.map(movie => {
            return (
                <tr key={movie._id}>
                    <td>{movie._id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.director}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre}</td>
                    <td className={movie.isActive ? "text-success" : "text-danger"}>
                        {movie.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td className="text-center">
                    	<div className="d-flex flex-column align-items-center gap-2">
                        	{/*<EditMovie movie={movie} fetchData={fetchData}/>                  
                        	<ArchiveMovie movie={movie} isActive={movie.isActive} fetchData={fetchData}/>*/}
                    	</div>
                    </td>

                </tr>
                )
        })

        setMovies(moviesArr)

    }, [moviesData])


    return(
        <>
         <div className="admin-dashboard-container"> 
            <h1 className="text-center my-4">Admin Dashboard</h1>
            <div className="d-flex justify-content-center gap-3 mb-4">
                {/* Navigate to AddProduct page */}
                <Button className="primary" onClick={() => navigate("/addMovie")}>
                    Add Movie
                </Button>

            </div>

            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Director</th>
                        <th>Year</th>
                        <th>Genre</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {movies}
                </tbody>
            </Table>    
         </div>
        </>
        )
}