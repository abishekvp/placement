import React, { useState } from 'react';
import Navbar from './navbar';

function Addevent() {
  const [formData, setFormData] = useState({
    comapanyname: '',
    degree: '',
    batch:'',
    branch:'',
    role:'',
    date:'',
    category:''
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
      <Navbar/>
      <div className='container'>
          <h1>Add Placement Drive</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="companyname">Company Name : </label>
                  <input type='text' id='companyname' name='companyname' placeholder='companyname' onChange={handleChange} value={formData.companyname} />
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
                  <label htmlFor="degree">Degree : </label>
                  <input type='text' id='degree' name='degree' placeholder='Degree' onChange={handleChange} value={formData.degree} />
              </div>
              <div>
                  <label htmlFor="date">Date : </label>
                  <input type='text' id='date' name='date' placeholder='Drive Date' onChange={handleChange} value={formData.date} />
              </div>
              <div>
                  <label htmlFor="category">Category : </label>
                  <input type='text' id='category' name='category' placeholder='category' onChange={handleChange} value={formData.category} />
              </div>
              <input type='submit' value="Add Event" />
          </form>
      </div>
    </div>
  )
}

export default Addevent