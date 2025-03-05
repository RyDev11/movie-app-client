import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, Link } from "react-router-dom";
import { Notyf } from "notyf";
import UserContext from "../context/UserContext";

export default function Login() {

    const { user, setUser } = useContext(UserContext);
    console.log(user);

    const notyf = new Notyf();

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    console.log("API URL:", process.env.REACT_APP_API_BASE_URL);

    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password

            })
        })
        .then(res => res.json())
        .then(data => {

            // Response from the api
            console.log(data);

            if(data.access) {

                // Stores the token in the localStorage
                // Inspect > Application > Local Storage >http://localhost:3000
                localStorage.setItem("token", data.access);
                // Retrieve user details upon login
                retrieveUserDetails(data.access)
               
                // Clear input fields after submission
                setEmail('');
                setPassword('');

                notyf.success(`Successful login!`);
            
            } else if (data.message == "Incorrect email or password") {

                notyf.error(`Incorrect Credentials. Please try again.`);

            } else {

                notyf.error(`User Not Found. Try Again.`);
            }

        })

    }

    // Function to retrieve the details of the user
    function retrieveUserDetails(token){

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

        if (data.user) {
            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });
          } else {
          	console.error("No user data found.");
          }
        })
    }

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (
        (user.id !== null) ? <Navigate to="/" /> : (
            <div className="auth-page d-flex justify-content-center align-items-center vh-100">
                <div className="auth-container shadow-lg p-4 rounded">
                    <Form onSubmit={(e) => authenticate(e)}>
                        <h2 className="mb-4 text-center">Login</h2>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter Email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button 
                            variant={isActive ? "primary" : "danger"} 
                            type="submit" 
                            className="w-100"
                            disabled={!isActive}
                        >
                            Log In
                        </Button>
                    </Form>

                    <p className="mt-3 text-center">
                        Don't have an account yet? <Link to="/register">Register here</Link>.

                    </p>
                   
                </div>
            </div>
        )
    );

}