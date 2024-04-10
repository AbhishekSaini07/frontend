// Signup.tsx

import React, { useState } from 'react';
import { newUserData } from '../DataModel/newUserData';
import UserService from '../Service/UserService';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../Styles/signup.module.css';
import logo from '../Assets/Logo/actiDo.png'; // Import the logo image

const Signup: React.FC = () => {
    const [userData, setUserData] = useState<newUserData>({
        userName: '',
        name: '',
        email: '',
        password: '',
        userDescription: '',
        imageUrl: '' // Added imageUrl field
    });
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await UserService.Signup(userData);
            // Handle successful signup (e.g., redirect to login page)
            navigate('/home');
        } catch (error) {
            console.error('Signup error:', error);
            // Display error message to user
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <label className={styles.formLabel}>
                    Username:
                    <input type="text" value={userData.userName} onChange={e => setUserData({ ...userData, userName: e.target.value })} className={styles.inputField} required />
                </label>
                <label className={styles.formLabel}>
                    Name:
                    <input type="text" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} className={styles.inputField} required />
                </label>
                <label className={styles.formLabel}>
                    Email:
                    <input type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} className={styles.inputField} required />
                </label>
                <label className={styles.formLabel}>
                    Password:
                    <input type="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} className={styles.inputField} required />
                </label>
                <label className={styles.formLabel}>
                    Description:
                    <textarea value={userData.userDescription} onChange={e => setUserData({ ...userData, userDescription: e.target.value })} className={styles.textareaField} required></textarea>
                </label>
                <button type="submit" className={styles.submitButton}>Signup</button>
            </form>
            <p className={styles.loginRedirect}>
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default Signup;
