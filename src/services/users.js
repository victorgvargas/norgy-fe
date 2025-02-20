import axios from "axios";

export const getUser = async (userId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user`, {
            userId
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch user:', response.data);
        }
    } catch (error) {
        console.error('Error fetching user:', error.message);
    }
}