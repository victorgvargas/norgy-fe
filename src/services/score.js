import axios from 'axios';

export const incrementScore = async (userId, category, amount) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/scores/update`, {
            userId,
            category,
            amount
        });

        if (response.status === 200) {
            console.log('Counter updated successfully!');
            return response.data;
        } else {
            console.error('Failed to update counter:', response.data);
        }
    } catch (error) {
        console.error('Error updating counter:', error.message);
    }
};

export const getUsersCounters = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/scores/users`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch users counters:', response.data);
        }
    } catch (error) {
        console.error('Error fetching users counters:', error.message);
    }
}

export const getUserCounters = async (userId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/scores/user`, {
            userId
            }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch user counters:', response.data);
        }
    } catch (error) {
        console.error('Error fetching user counters:', error.message);
    }
}

export const getGlobalScore = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/scores/global`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch global score:', response.data);
        }
    } catch (error) {
        console.error('Error fetching global score:', error.message);
    }
}

export const resetUserCounters = async (userId) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/scores/reset-single`, {
            userId
        });

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to reset user counters:', response.data);
        }
    } catch (error) {
        console.error('Error resetting user counters:', error.message);
    }
}

export const resetGlobalCounters = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/scores/reset`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to reset global counters:', response.data);
        }
    } catch (error) {
        console.error('Error resetting global counters:', error.message);
    }
}