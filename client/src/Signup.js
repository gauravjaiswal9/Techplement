import React, { useState } from 'react';

function Signup({ setPage, setUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        dob: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                setUser(formData);
                setPage('profile');
            }
        } catch (error) {
            alert('Error signing up.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input name="name" placeholder="Name" onChange={handleChange} required /><br/><br/>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
            <input name="city" placeholder="City" onChange={handleChange} required /><br/><br/>
            <input name="dob" type="date" placeholder="Date of Birth" onChange={handleChange} required /><br/><br/>
            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;