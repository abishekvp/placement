import React, { useState } from 'react';

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
        resume: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h1>Sign In</h1>
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
                    <label htmlFor="phone">Phone : </label>
                    <input type='tel' id='phone' name='phone' placeholder='Phone' onChange={handleChange} value={formData.phone} />
                </div>
                <div>
                    <label htmlFor="degree">Degree : </label>
                    <input type='text' id='degree' name='degree' placeholder='Degree' onChange={handleChange} value={formData.degree} />
                </div>
                <div>
                    <label htmlFor="placed">Placed : </label>
                    <input type='text' id='placed' name='placed' placeholder='Placed' onChange={handleChange} value={formData.placed} />
                </div>
                <div>
                    <label htmlFor="registered">Registered : </label>
                    <input type='text' id='registered' name='registered' placeholder='Registered' onChange={handleChange} value={formData.registered} />
                </div>
                <div>
                    <label htmlFor="resume">Resume : </label>
                    <input type='file' id='resume' name='resume' onChange={handleChange} value={formData.resume} />
                </div>
                
                <input type='submit' value="Submit" />
            </form>
        </div>
    )
}

export default AddStudent;
