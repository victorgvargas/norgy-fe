import { Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { register } from "../services/auth";
import { Link, useNavigate } from "react-router";

const Register = () => {
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

    const onRegister = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const credentials = { email, password };

        try {
            setPending(true);
            await register(credentials);
            navigate("/login");
        } catch (error) {
            alert('Error registering!');
        } finally {
            setPending(false);
        }
    };

    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography variant="h4">Register</Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: "24px" }} component="form" onSubmit={onRegister}>
            <TextField required label="Email" name="email" placeholder="user@mail.com" value={formData.email} onChange={handleChange} />
            <TextField required label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
            <Button variant="contained" type="submit" disabled={pending || !isFormValid}>
                {pending ? <CircularProgress color="secondary"/> : "Register"}
            </Button>
            <Link to="/login">Already have an account? Login</Link>
        </Box>
      </Container>
    );
}

export default Register;