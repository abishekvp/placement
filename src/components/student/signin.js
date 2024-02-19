import React, { useState } from 'react';
import { firebaseApp } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [rollnumber, setRollnumber] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRollnumberChange = (e) => {
        setRollnumber(e.target.value);
    };

    const handleDobChange = (e) => {
        setDob(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // Check if the rollnumber exists in the "Student" collection
            const studentData = await getStudentData(rollnumber);
    
            if (!studentData) {
                setErrorMessage('Rollnumber does not exist.');
                return;
            }
    
            // If rollnumber exists, check if the provided dob matches
            if (studentData.dob === dob) {
                console.log('Login successful!');
                setErrorMessage('');
    
                // Store rollnumber in local storage
                localStorage.setItem('rollnumber', rollnumber);
    
                // Navigate to /student after successful login, passing rollnumber as state
                navigate('/student', { state: { rollnumber } });
            } else {
                setErrorMessage('Incorrect date of birth. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in. Please try again.');
        }
    };
    

    const getStudentData = async (rollnumber) => {
        const studentDoc = await firebaseApp.firestore().collection('Student').doc(rollnumber).get();
        return studentDoc.exists ? studentDoc.data() : null;
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Student Login</h2>
                <input type="text" placeholder='Roll Number' value={rollnumber} onChange={handleRollnumberChange} />
                <input type="date" placeholder='Date of Birth' value={dob} onChange={handleDobChange} />
                <button type="submit">Login</button>
            </form>
            {errorMessage && (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
        </div>
    );
}

export default SignIn;
