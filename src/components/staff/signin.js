import React, { useState } from 'react';
import { firebaseApp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Check if the username exists
            const usernameExists = await checkUsernameExists(username);

            if (!usernameExists) {
                setErrorMessage('Username does not exist.');
                return;
            }

            // If username exists, check if the password matches
            const userDoc = await firebaseApp.firestore().collection('Login').doc(username).get();
            const userData = userDoc.data();

            if (userData.password === password) {
                console.log('Login successful!');
                setErrorMessage('');
                setIsRegistered(true);

                // Navigate to /staff after successful login
                navigate('/staff');
            } else {
                setErrorMessage('Incorrect password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in. Please try again.');
        }
    };

    const checkUsernameExists = async (username) => {
        const userDoc = await firebaseApp.firestore().collection('Login').doc(username).get();
        return userDoc.exists;
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleLogin}>
                <h2>Placement Admin Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Username" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
 
export default Signin
