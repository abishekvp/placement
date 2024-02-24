import React, { useState } from 'react';
import { firebaseApp } from '../../firebase';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

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
        registered: [],
        resume: '',
        higherstudies: '',
        resumeFile: null,
        resumeDownloadLink: '',
        arrearCount: '',
    });
    const navigate = useNavigate();
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
                const registeredArray = formData.registered.split(',').map((company) => company.trim());
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
                    registered: registeredArray,
                    resume: resumeDownloadLink,
                    higherstudies: formData.higherstudies,
                    arrearCount: formData.arrearCount,
                });
                alert('Student added successfully!');
                navigate('/staff/students');
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
        <section>
            <Navbar/>
            <div className='container'>
                <h1>Add Student</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Student Name : </label>
                        <input type='text' className= "inputBox" id='name' name='name' placeholder='Name' onChange={handleChange} value={formData.name} required />
                    </div>
                    <div>
                        <label htmlFor="rollnumber">Roll Number : </label>
                        <input type='text' className= "inputBox" id='rollnumber' name='rollnumber' placeholder='Roll Number' onChange={handleChange} value={formData.rollnumber} required />
                    </div>
                    <div>
                        <label htmlFor="email">Email : </label>
                        <input type='email' className= "inputBox" id='email' name='email' placeholder='Email' onChange={handleChange} value={formData.email} required />
                    </div>
                    <div>
                        <label htmlFor="fathername">Father's Name : </label>
                        <input type='text' className= "inputBox" id='fathername' name='fathername' placeholder="Father's Name" onChange={handleChange} value={formData.fathername} required />
                    </div>
                    <div>
                        <label htmlFor="dob">Date of Birth : </label>
                        <input type='date'  className= "inputBox" id='dob' name='dob' onChange={handleChange} value={formData.dob} required />
                    </div>
                    <div>
                        <label htmlFor="batch">Batch : </label>
                        <input type='text' className= "inputBox" id='batch' name='batch' placeholder='Batch' onChange={handleChange} value={formData.batch} required />
                    </div>
                    <div>
                        <label htmlFor="branch">Branch : </label>
                        <input type='text' className= "inputBox" id='branch' name='branch' placeholder='Branch' onChange={handleChange} value={formData.branch} required />
                    </div>
                    <div>
                        <label htmlFor="cgpa">CGPA : </label>
                        <input type='text' className= "inputBox" id='cgpa' name='cgpa' placeholder='CGPA' onChange={handleChange} value={formData.cgpa} required />
                    </div>
                    <div>
                        <label htmlFor="arrearCount">Arrear Count : </label>
                        <input type='text' className= "inputBox" id='arrearCount' name='arrearCount' placeholder='Arrear Count' onChange={handleChange} value={formData.arrearCount} required/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone : </label>
                        <input type='tel' className= "inputBox" id='phone' name='phone' placeholder='Phone' onChange={handleChange} value={formData.phone} />
                    </div>
                    <div>
                        <label htmlFor="degree">Degree : </label>
                        <input type='text' className= "inputBox" id='degree' name='degree' placeholder='Degree' onChange={handleChange} value={formData.degree} required/>
                    </div>
                    <div>
                        <label htmlFor="registered">Registered Companies: </label>
                        <input
                        style={{width: '50%'}}
                            type='text'
                            id='registered'
                            name='registered'
                            placeholder='Separate multiple companies with commas (e.g., Company1, Company2).'
                            onChange={handleChange}
                            value={formData.registered}
                            className= "inputBox"
                        />
                    
                    </div>
                    <div>
                        <label htmlFor="higherstudies">Higher Studies: </label>
                        <select className= "inputBox" id="higherstudies" name="higherstudies" onChange={handleChange} value={formData.higherstudies} required>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="placed">Placed: </label>
                        <select id="placed" className= "inputBox" name="placed" onChange={handleChange} value={formData.placed} required>
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="resume">Resume : </label>
                        <input type='file' id='resume' name='resume' onChange={handleFileChange} required/>
                    </div>
                    <button type="button" onClick={handleFileUpload}>
                        Upload Resume
                    </button>
                    <input type='submit' value="Submit" />
                </form>
            </div>
        </section>
    )
}

export default AddStudent;
