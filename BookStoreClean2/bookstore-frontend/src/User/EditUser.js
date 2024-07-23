// src/User/EditUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = ({ onUserUpdated }) => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7051/api/users/GetUserById/${id}`)
            .then(response => {
                const user = response.data;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setUsername(user.username);
                setPhoneNumber(user.phoneNumber);
              
            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
                setError('Error fetching book data.');

            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedUser = {
            id,
            firstName,
            lastName,
            username,
            email,
            phoneNumber
           
        };

        axios.put(`https://localhost:7051/api/users/UpdateUser/${id}`, updatedUser)
            .then(response => {
                console.log('user updated!', response.data);
                onUserUpdated(response.data);
                navigate('/bookstore');
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });

    };

    return (
        <div>
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                </div>
                <button type="submit">Update User</button>
                <button onClick={() => navigate('/bookstore')}>Cancel</button>
            </form>
        </div>
    );
};

export default EditUser;
