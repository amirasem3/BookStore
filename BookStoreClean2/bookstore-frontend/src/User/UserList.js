// src/UserList.js
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
const UserList = () => {
    const { role } = useParams();
    const {userId} = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('https://bookstoreclean.liara.run/api/users/AllUsers',{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response => {
                console.log('Users fetched:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    };
    
    if (role.includes("Admin")){
        return (
            <div>
                <h2>Users List</h2>
                <Link to={`/${role}/users/add`}>Add New user</Link>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>PhoneNumber</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td><Link to={`/${role}/users/${user.id}/detail/${user.id}`}>{user.id}</Link></td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.roleName}</td>
                            <td>
                                <Link to={`/${role}/users/edit/${user.id}`}>Edit</Link>
                                <br/>
                                <Link to={`/${role}/users/delete/${user.id}`}>Delete</Link>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
               
                <button onClick={() => navigate(`/bookstore/${role}/${userId}`)}>Back to Main</button>
            </div>
        );
    }
    else {
        return (
            <div>
               <h1>You Do Not Have Access To This Page!!</h1>
                <button onClick={() => navigate(`/bookstore/${role}/${userId}`)}>Back to Main</button>
            </div>
        );
    }
};

export default UserList;
