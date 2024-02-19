import React, { useState } from 'react';
import { firebaseApp } from '../../firebase';
import Navbar from './navbar';

function AddStudent() {
    const [formData, setFormData] = useState({
        name: '',
        rollnumber: '',
        email: '',
        fathername: '',
        dob: '',
        batch: '',
        branch: '',
        cgpa: '',
        phone: '',
        degree: '',
        placed: '',
        registered: '',
        resume: '',
        higherstudies: '',
        resumeFile: null,
        resumeDownloadLink: '',
        arrearCount: '',
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            resumeFile: file,
        });
    };

    const handleFileUpload = async () => {
        try {
            const file = formData.resumeFile;
            if (file) {
                const storageRef = firebaseApp.storage().ref();
                const fileRef = storageRef.child(`resumes/${formData.rollnumber}_${file.name}`);
                await fileRef.put(file);
                const downloadURL = await fileRef.getDownloadURL();

                setFormData({
                    ...formData,
                    resumeDownloadLink: downloadURL,
                });

                console.log('File uploaded successfully!');
                return downloadURL; // Return the download URL
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error; // Propagate the error
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const resumeDownloadLink = await handleFileUpload();
    
            if (resumeDownloadLink) {
                const rollNumber = formData.rollnumber;
                const studentRef = firebaseApp.firestore().collection('Student').doc(rollNumber);
    
                // Upload data to Firestore
                await studentRef.set({
                    name: formData.name,
                    rollnumber: formData.rollnumber,
                    email: formData.email,
                    fathername: formData.fathername,
                    dob: formData.dob,
                    batch: formData.batch,
                    branch: formData.branch,
                    cgpa: formData.cgpa,
                    phone: formData.phone,
                    degree: formData.degree,
                    placed: formData.placed,
                    registered: formData.registered,
                    resume: resumeDownloadLink,
                    higherstudies: formData.higherstudies,
                    arrearCount: formData.arrearCount,
                });
                console.log('Data uploaded successfully!');
            } else {
                console.error('Error uploading resume file.');
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };
    

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <Navbar/>
            <div className='container'>
                <h1>Add Student</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Student Name : </label>
                        <input type='text' id='name' name='name' placeholder='Name' onChange={handleChange} value={formData.name} />
                    </div>
                    <div>
                        <label htmlFor="rollnumber">Roll Number : </label>
                        <input type='text' id='rollnumber' name='rollnumber' placeholder='Roll Number' onChange={handleChange} value={formData.rollnumber} />
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <input type='email' id='email' name='email' placeholder='Email' onChange={handleChange} value={formData.email} />
                    </div>
                    <div>
                        <label htmlFor="fathername">Father's Name : </label>
                        <input type='text' id='fathername' name='fathername' placeholder="Father's Name" onChange={handleChange} value={formData.fathername} />
                    </div>
                    <div>
                        <label htmlFor="dob">Date of Birth : </label>
                        <input type='date' id='dob' name='dob' onChange={handleChange} value={formData.dob} />
                    </div>
                    <div>
                        <label htmlFor="batch">Batch : </label>
                        <input type='text' id='batch' name='batch' placeholder='Batch' onChange={handleChange} value={formData.batch} />
                    </div>
                    <div>
                        <label htmlFor="branch">Branch : </label>
                        <input type='text' id='branch' name='branch' placeholder='Branch' onChange={handleChange} value={formData.branch} />
                    </div>
                    <div>
                        <label htmlFor="cgpa">CGPA : </label>
                        <input type='text' id='cgpa' name='cgpa' placeholder='CGPA' onChange={handleChange} value={formData.cgpa} />
                    </div>
                    <div>
                        <label htmlFor="arrearCount">Arrear Count : </label>
                        <input type='text' id='arrearCount' name='arrearCount' placeholder='Arrear Count' onChange={handleChange} value={formData.arrearCount} />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone : </label>
                        <input type='tel' id='phone' name='phone' placeholder='Phone' onChange={handleChange} value={formData.phone} />
                    </div>
                    <div>
                        <label htmlFor="degree">Degree : </label>
                        <input type='text' id='degree' name='degree' placeholder='Degree' onChange={handleChange} value={formData.degree} />
                    </div>
                    <div>
                        <label htmlFor="registered">Registered : </label>
                        <input type='text' id='registered' name='registered' placeholder='Registered' onChange={handleChange} value={formData.registered} />
                    </div>
                    <div>
                        <label htmlFor="higherstudies">Higher Studies: </label>
                        <select id="higherstudies" name="higherstudies" onChange={handleChange} value={formData.higherstudies}>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="placed">Placed: </label>
                        <select id="placed" name="placed" onChange={handleChange} value={formData.placed}>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="resume">Resume : </label>
                        <input type='file' id='resume' name='resume' onChange={handleFileChange} />
                    </div>
                    <button type="button" onClick={handleFileUpload}>
                        Upload Resume
                    </button>
                    <input type='submit' value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default AddStudent;
