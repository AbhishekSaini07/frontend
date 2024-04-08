import React, { useState } from 'react';
import { newUserData } from '../DataModel/newUserData';
import UserService from '../Service/UserService';

const Signup: React.FC = () => {
    const [userData, setUserData] = useState<newUserData>({
        userName: '',
        name: '',
        email: '',
        password: '',
        userDescription: '',
        imageUrl: '' // Added imageUrl field
    });

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await UserService.Signup(userData);
            // Handle successful signup (e.g., redirect to login page)
            alert('Signup successful. Please login to continue.');
           
        } catch (error) {
            console.error('Signup error:', error);
            // Display error message to user
            alert('Signup failed. Please try again.');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({ ...userData, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <label>
                    Username:
                    <input type="text" value={userData.userName} onChange={e => setUserData({ ...userData, userName: e.target.value })} required />
                </label>
                <label>
                    Name:
                    <input type="text" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} required />
                </label>
                <label>
                    Description:
                    <textarea value={userData.userDescription} onChange={e => setUserData({ ...userData, userDescription: e.target.value })} required></textarea>
                </label>
                {/* <label>
                    Image:
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                {userData.imageUrl && <img src={userData.imageUrl} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />} */}
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
