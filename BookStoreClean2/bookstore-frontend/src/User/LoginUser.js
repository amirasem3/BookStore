// src/LoginUser.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const LoginUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleName, setRoleName] = useState('');
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newBook = {
            username,
            password
        };

        axios.post('https://bookstoreclean.liara.run/api/users/Login', newBook)
            .then(response => {
                const user = response.data;
                console.log('User Logged In!', user.username);
                setUsername(user.username);
                setPassword(user.password);
                setRoleName(user.roleName);
                setUser(user);
                if (user.roleName.includes("Admin")){
                    navigate(`${user.roleName}/${user.id}`);    
                }
                else {

                    navigate(`${user.roleName}/${user.id}`);
                }
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
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
               
                <button type="submit">Login</button>
             
            </form>
        </div>
    );
};

export default LoginUser;