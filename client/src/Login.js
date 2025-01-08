import React, { useState } from 'react';

function Login({ setPage, setUser }) {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                setUser(data.user);
                setPage('profile');
            }
        } catch (error) {
            alert('Invalid email or password.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br/><br/>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br/><br/>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;