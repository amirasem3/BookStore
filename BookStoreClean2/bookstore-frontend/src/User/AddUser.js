// src/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const AddUser = ({ onUserAdded }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newBook = {
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
        };

        axios.post('https://localhost:7051/api/users/RegisterUser', newBook)
            .then(response => {
                console.log('User added!', response.data);
                onUserAdded(response.data);  // Call the callback with the new book
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPhoneNumber('');
                setPassword('');
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error adding the User!', error);
            });
    };

    return (
        <div>
            <h2>Add a New Book</h2>
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
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                </div>
                <button type="submit">Register</button>
                <button onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default AddUser;
