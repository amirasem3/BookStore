// src/DetailUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DetailUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7051/api/users/GetUserById/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user!', error);
            });
    }, [id]);

    if (!user){
        return <div> Loading .... </div>;
    }

    return (
        <div>
            <h2>{user.firstName} {user.lastName}</h2>
            <di>
                <strong>ID:</strong> {user.id}
            </di>
            <div>
                <strong>First Name:</strong> {user.firstName}
            </div>
            <div>
                <strong>Last Name:</strong> {user.lastName}
            </div>
            <div>
                <strong>Username:</strong> {user.username}
            </div>
            <div>
                <strong>Email:</strong> {user.email}
            </div>
            <div>
                <strong>Phone Number:</strong> {user.phoneNumber}
            </div>
            <div>
                <strong>Password Hash:</strong> {user.passwordHash}
            </div>
            <button onClick={()=> navigate('/bookstore/users')}>Back to list</button>
        </div>
    );
};

export default DetailUser;
