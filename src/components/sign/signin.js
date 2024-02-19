import React, { useState } from 'react';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your signin logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input type="email" placeholder='Email' value={email} onChange={handleEmailChange} />
                <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Signin;
