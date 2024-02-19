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


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Check if the username already exists
            const usernameExists = await checkUsernameExists(username);

            if (usernameExists) {
                setErrorMessage('Username already exists. Choose another username.');
                return;
            }

            // If username doesn't exist, create a new document in the "Login" collection
            await firebaseApp.firestore().collection('Login').doc(username).set({
                username,
                password,
            });

            console.log('User registered successfully!');
            setIsRegistered(true);
            setShowRegisterForm(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Error registering user:', error);
            setErrorMessage('Error registering user. Please try again.');
        }
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
        <div>
            <form onSubmit={handleLogin}>
                <h2>StaLogin</h2>
                <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} />
                <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
 
export default Signin
