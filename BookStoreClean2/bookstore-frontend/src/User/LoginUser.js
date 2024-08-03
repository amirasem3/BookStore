// src/LoginUser.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Header from "../Component/Header";

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

        axios.post(`https://bookstoreclean.liara.run/Account/login?Username=${username}&Password=${password}`)
            .then(response => {
                const user = response.data.user;
                const token = response.data.token;
                console.log('User Logged In!', user.username);
                console.log('Generated Token:', token);
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUsername(user.username);
                setPassword(user.password);
                setRoleName(user.roleName);
                setUser(user);
                    navigate(`/bookstore/${user.roleName}/${user.id}`);    
                
            })
            .catch(error => {
                console.error('There was an error adding the User!', error);
            });
    };

    return (
        <div>
            <h2>Welcome to Book Store</h2>
            <Header/>
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