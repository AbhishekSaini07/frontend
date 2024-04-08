import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import { Console } from 'console';


const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userData = await UserService.Login(email, password);
            // Handle successful login (e.g., redirect to dashboard)
            if (userData) {
                console.log('Logged in user:', userData);
                navigate("/home");
            }
            else {
               
                // Display error message to user
                console.log('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            // Display error message to user
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
