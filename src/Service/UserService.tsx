import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { newUserData } from '../DataModel/newUserData';
import { UserData } from '../DataModel/userModel';

const BASE_URL = 'http://localhost:5000'; // Update with your backend URL

const UserService = {
    Login: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email, password }, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                }});
            const token = response.data.token;
            localStorage.setItem('token', token); // Store token in local storage
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw new Error('Login failed');
        }
    },

    Signup: async (userData: newUserData) => {
        try {
            console.log(userData);
            const response = await axios.post(`${BASE_URL}/signup`, userData, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                }});
            const token = response.data.token;
            localStorage.setItem('token', token); // Store token in local storage
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw new Error('Signup failed');
        }
    },

    Logout: async () => {
        const navigate = useNavigate();
        try {
            await axios.get(`${BASE_URL}/logout`, { withCredentials: true });
            localStorage.removeItem('token'); // Remove token from local storage on logout
           // Redirect to login page
        } catch (error) {
            handleServiceError(error);
            throw new Error('Logout failed');
        }
    },

    fetchAllUsers: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get<UserData[]>(`${BASE_URL}/users`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}` // Include token in Authorization header
                }
            });
            return response.data;
        } catch (error) {
            handleServiceError(error);
            throw new Error('Failed to fetch users');
        }
    }
};

function handleServiceError(error: any) {
    console.error('Service error:', error);
    alert('An error occurred. Please try again later.');
}

export default UserService;
