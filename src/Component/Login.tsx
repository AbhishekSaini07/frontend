// Login.tsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../Service/UserService';
import styles from '../Styles/login.module.css'; // Import the updated CSS module
import logoPath from '../Assets/Logo/actiDo.png';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userData = await UserService.Login(email, password);
            if (userData) {
                console.log('Logged in user:', userData);
                navigate("/home");
            } else {
                console.log('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className={styles.loginContainer}>
            {/* Optionally add a logo */}
            <div className={styles.logo}>
                <img src={logoPath} alt="Logo" />
            </div>
            <h2>Login</h2>
            <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                <label className={styles.formLabel}>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={styles.inputField} required />
                </label>
                <label className={styles.formLabel}>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className={styles.inputField} required />
                </label>
                <button type="submit" className={styles.submitButton}>Login</button>
            </form>
            <p className={styles.loginRedirect}>
                Create New Account!  <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
};

export default Login;
