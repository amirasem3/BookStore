// src/UserList.js
import React from 'react';
import { Link } from 'react-router-dom';
const UserList = ({ users }) => {

    return (
        <div>
            <h2>Users List</h2>
            <Link to={`/bookstore/addUser`}>Add New user</Link>
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
                        <td><Link to={`/detailUser/${user.id}`}>{user.id}</Link></td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>
                            <Link to={`/bookstore/editUser/${user.id}`}>Edit</Link>
                            <Link to={`/bookstore/deleteUser/${user.id}`}>Delete</Link>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
