import axios from 'axios';

export const login = async (credentials) => {
    const API_URL = process.env.REACT_APP_API_URL;

    try {
        const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
        localStorage.setItem('token', response.data["access_token"]);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const register = async (credentials) => {
    const API_URL = process.env.REACT_APP_API_URL;

    try {
        const response = await axios.post(`${API_URL}/register`, credentials, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

export const logout = async () => {
    const API_URL = process.env.REACT_APP_API_URL;

    try {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};