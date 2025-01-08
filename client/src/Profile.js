import React, { useState } from 'react';

function Profile({ user, setPage, setUser }) {
    const [formData, setFormData] = useState(user);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/update-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            alert(data.message);
            if (response.ok) {
                setUser(formData);
                setIsEditing(false);
            }
        } catch (error) {
            alert('Error updating profile.');
        }
    };

    const handleLogout = () => {
        setUser(null);
        setPage('home');
    };

    return (
        <div>
            <h2>Profile</h2>
            {isEditing ? (
                <form onSubmit={handleUpdate}>
                    <input name="name" value={formData.name} onChange={handleChange} required /><br/><br/>
                    <input name="email" value={formData.email} readOnly /><br/><br/>
                    <input name="password" type="password" value={formData.password} onChange={handleChange} required /><br/><br/>
                    <input name="city" value={formData.city} onChange={handleChange} required /><br/><br/>
                    <input name="dob" type="date" value={formData.dob} onChange={handleChange} required /><br/><br/>
                    <button type="submit">Save</button><br/><br/>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>Date of Birth:</strong> {user.dob}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;