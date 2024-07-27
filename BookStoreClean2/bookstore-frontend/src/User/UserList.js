// src/UserList.js
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
const UserList = ({ users }) => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Users List</h2>
            <Link to={`/bookstore/users/add`}>Add New user</Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>PhoneNumber</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td><Link to={`/bookstore/users/detail/${user.id}`}>{user.id}</Link></td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        
                        <td>
                            <Link to={`/bookstore/users/edit/${user.id}`}>Edit</Link>
                            <Link to={`/bookstore/users/delete/${user.id}`}>Delete</Link>
                           
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/bookstore')}>Back to Main</button>
        </div>
    );
};

export default UserList;
