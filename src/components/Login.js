import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // For navigation between pages
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();  // React Router's hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');  // Navigate to the NewsFetcher component after login
        } catch (err) {
            console.log(setError(err.message));
            alert('Wrong Email Id or Password');
        }
    };

    const goToRegister = () => {
        navigate('/register');  // Navigate to the register page
    };

    return (
        <Container className="login-container">
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleLogin} className="login-form extra-style">
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
                    Login
                </Button>
            </form>
            {error && <Typography color="error" align="center">{error}</Typography>}

            {/* Add the Register button below the form */}
            <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={goToRegister}  // Navigate to register page when clicked
                className="register-link"
            >
                Don't have an account? Register
            </Button>
        </Container>
    );
};

export default Login;
