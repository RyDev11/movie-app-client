import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AppNavbar from "./components/AppNavbar";

import Home from "./pages/Home";
import Movies from "./pages/Movies";

import AddMovie from "./components/AddMovie";
import Register from "./pages/Register";
import Login from './pages/Login';
import Logout from "./pages/Logout";

import { UserProvider } from "./context/UserContext";


function App() {
  // State hook for the user to allow it to have a global scope
  const [ user, setUser ] = useState({
    id: null,
    isAdmin: null
  });

  // Function for clearing the local storage
  function unsetUser(){
    localStorage.clear();
  }

  // Used to check if the user information is properly stored
  useEffect(() => {
    console.log(user);
    console.log(localStorage);
    
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {

        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)

        if(data && data.user){
          setUser({
              id: data.user._id,
              isAdmin: data.user.isAdmin
          });
        } else {

          setUser({
              id: null,
              isAdmin: null
          });
        }
    })
  }, [])





  return (
    <>
      <UserProvider value={{user, setUser, unsetUser}}>
        <Router>
          <AppNavbar/>
          <Container>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              
              <Route path="/addMovie" element={<AddMovie />} />
              {/*<Route path="/movies/:id" element={<MovieDetails />} />*/}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
             

          </Routes>

          </Container>
          
        </Router>

      </UserProvider>
    </>

  )
}

export default App;
