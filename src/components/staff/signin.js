import React, { useState } from 'react';
import { firebaseApp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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

                // Store username and role in local storage
                localStorage.setItem('username', username);
                localStorage.setItem('userRole', 'staff');

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
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Placement Admin Login</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    className={'inputBox'}
                  
                    id="username"
                    placeholder="Enter your username here"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <br />
           
            <div className={'inputContainer'}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className={'inputBox'}
                    id="password"
                    placeholder="Enter your password here"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <br />
            <div className={'inputContainer'}>
                <button type="submit" className={'btn btn-primary'} onClick={handleLogin}>
                    Login
                </button>
            </div>
            {errorMessage && (
                <div className={'errorContainer'}>
                    <label className={'errorLabel'}>{errorMessage}</label>
                </div>
            )}
        </div>
    );
}

export default Signin;
