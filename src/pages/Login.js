import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { login } from "../services/auth";
import { Link, useNavigate } from "react-router";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [pending, setPending] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        setIsFormValid(formData.email !== '' && formData.password !== '');
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const credentials = { email, password };

        try {
            setPending(true);
            await login(credentials);
            navigate("/");
        } catch (error) {
            alert('Error logging in!');
        } finally {
            setPending(false);
        }
    };

    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h4">Login</Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: "24px" }} component="form" onSubmit={onLogin}>
            <TextField required label="Email" name="email" placeholder="user@mail.com" value={formData.email} onChange={handleChange} />
            <TextField required label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <Button variant="contained" type="submit" disabled={pending || !isFormValid}>
                {pending ? <CircularProgress color="secondary"/> : "Login"}
            </Button>
            <Link to="/register">Don't have an account? Register here!</Link>
        </Box>
      </Container>
    );
}

export default Login;