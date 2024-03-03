import React, { useState } from 'react';
import axios from 'axios';
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

                // Store rollnumber and role in local storage
                localStorage.setItem('rollnumber', rollnumber);
                localStorage.setItem('userRole', 'student');

                // Navigate to /student after successful login
                navigate('/student');
            } else {
                setErrorMessage('Incorrect date of birth. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in. Please try again.');
        }
    };

    const getStudentData = async (rollnumber) => {
        // check if rollnumber exists in the in /students route in rollnumber field
        const response = await axios.get('https://placementportal.vercel.app/students');
        const studentData = response.data.find((student) => student.rollnumber === rollnumber);
        console.log('Student data:', studentData);
        return studentData;

    };

    return (
       
            <div className={'mainContainer'}>
                 <div className={'signinContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            
            <br />
            <hr/>
            <br />
            <div className={'inputContainer'}>
                <input
                    type="text"
                    placeholder="Enter your roll number here"
                    className={'inputBox'}
                    value={rollnumber}
                    onChange={handleRollnumberChange}
                />
                <label className="errorLabel">{errorMessage}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    type="date"
                    placeholder="Enter your date of birth here"
                    className={'inputBox'}
                    value={dob}
                    onChange={handleDobChange}
                />
                <label className="errorLabel">{errorMessage}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    type="button"
                    className={'loginButton'}
                    value={'Log in'}
                    onClick={handleLogin}
                />
            </div>
            </div>
        </div>
        
    );
}

export default SignIn;
