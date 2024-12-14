'use client';

import '../styles/page.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function SchoolForm() {
  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  const [image, setImage] = useState(null);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleImageChange = (e) => {
    console.log('Selected files:', e.target.files);

    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      console.log('No file selected');
    }
  };

  const onSubmit = async () => {
    const data = getValues();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    if (image) {
      console.log('Appending image file to FormData:', image);
      formData.append("image", image);
    } else {
      console.log('No image to append');
    }
    console.log("formData==============",formData);
    console.log("data................",data);
    
    
    console.log("Form data being sent:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("School registered successfully!");
        reset();
      } else {
        setSubmitStatus(`Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setSubmitStatus("An error occurred while submitting.");
      console.error('Submission error:', error);
    }
  };

  return (
    <div className='form-container'>
      <h1>School Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div>
          <label htmlFor="name">School Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'School name is required' })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <p>{errors.address.message}</p>}
        </div>

        <div className='address-form'>
          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              {...register('city', { required: 'City is required' })}
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              {...register('state', { required: 'State is required' })}
            />
            {errors.state && <p>{errors.state.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="contact">Contact Number</label>
          <input
            id="contact"
            type="text"
            {...register('contact', { required: 'Contact number is required' })}
          />
          {errors.contact && <p>{errors.contact.message}</p>}
        </div>

        <div>
          <label htmlFor="email_id">Email ID</label>
          <input
            id="email_id"
            type="email"
            {...register('email_id', { required: 'Email ID is required' })}
          />
          {errors.email_id && <p>{errors.email_id.message}</p>}
        </div>

        <div>
          <label htmlFor="image">School Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submitStatus && <p>{submitStatus}</p>}
    </div>
  );
}
