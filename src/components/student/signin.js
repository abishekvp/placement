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
        const studentDoc = await firebaseApp.firestore().collection('Student').doc(rollnumber).get();
        return studentDoc.exists ? studentDoc.data() : null;
    };

    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
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
                    className={'inputButton'}
                    value={'Log in'}
                    onClick={handleLogin}
                />
            </div>
        </div>
    );
}

export default SignIn;
