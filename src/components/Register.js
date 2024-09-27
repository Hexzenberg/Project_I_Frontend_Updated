import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // , signInWithEmailAndPassword
import { auth } from "../firebase";
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Attempt to create a new user
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful!");
            navigate("/"); // Redirect to NewsFetcher on successful registration
        } catch (err) {
            // If the user already exists, try logging in
            if (err.code === "auth/email-already-in-use") {
                try {
                    // const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    // User is logged in successfully
                    alert("User already registered. Logged in successfully!");
                    navigate("/"); // Redirect to NewsFetcher after login
                } catch (loginError) {
                    setError(loginError.message);
                }
            } else {
                // Handle other registration errors
                setError(err.message);
            }
        }
    };

    return (
        <Container className="register-container">
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleRegister} className="login-form extra-style">
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    className="input-field"
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    className="input-field"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth className="login-button">
                    Register
                </Button>
            </form>
            {error && <Typography color="error" align="center">{error}</Typography>}
        </Container>
    );
};

export default Register;
