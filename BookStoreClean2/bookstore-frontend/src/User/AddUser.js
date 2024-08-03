// src/AddUser.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole]  = useState('');
    const {role} = useParams();
    const [userId, setUserId] = useState('');
    const[roleArray, setRoleArray] = useState([]);
    const [roles, setRoles]  = useState([]);
    const token  = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        fetchRoles();
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedRole(value);
    };

    const fetchRoles = () =>{
        axios.get('https://bookstoreclean.liara.run/api/Role/GetAllRoles',{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response =>{
                console.log('Roles Fetched:', response.data);
                setRoles(response.data);
            })
            .catch(error =>{
                console.error('There was an error in fetching the Roles!', error);
            })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        

        const newBook = {
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password,
            roleId:selectedRole
        };

        axios.post('https://bookstoreclean.liara.run/api/users/RegisterUser', newBook,{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response => {
                console.log('User added!', response.data);
                setFirstName('');
                setLastName('');
                setUsername('');
                setEmail('');
                setPhoneNumber('');
                setPassword('');
                setRoleId('');
                setUserId('');
                navigate(`/${role}/${user.id}/users`);
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
                <div>
                    <label htmlFor="roleDropdown">Choose a role:</label>
                    <select id="roleDropdown" value={selectedRole} onChange={handleChange}>
                        <option value="" disabled>Select a role</option>
                        {roles.map((role) => (
                            <option key={role.name} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Register</button>
                <button onClick={() => navigate(`/${role}/${user.id}/users`)}>Cancel</button>
            </form>
        </div>
    );
};

export default AddUser;
