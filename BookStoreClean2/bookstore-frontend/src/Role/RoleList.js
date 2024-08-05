// src/Role/RoleList
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";


const RoleList =  () => {
    const navigate = useNavigate();
    const {rolePara} = useParams();
    const {userId} = useParams();
    const [roles, setRoles]  = useState([]);
    const token  = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const rolesJson = JSON.stringify(roles);
    console.log("User = ", user.roleName);
    localStorage.setItem('roles', rolesJson);
    useEffect(() => {
        fetchRoles();
    }, []);

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
    return (
        <div>
            <h2>Role List</h2>
            <Link to={`/${user.roleName}/${user.id}/roles/add`}>Add New Role</Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {roles.map(role => (
                    <tr key={role.id}>
                        <td><Link to={`/${rolePara}/${userId}/roles/detail/${role.id}`}>{role.id}</Link></td>
                        <td>{role.name}</td>
                        <td>
                            <Link to={`/${rolePara}/${userId}/roles/edit/${role.id}`}>Edit</Link>
                            <br/>
                            <Link to={`/${rolePara}/${userId}/roles/delete/${role.id}`}>Delete</Link>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => navigate(`/bookstore/${rolePara}/${userId}`)}>Back to Main</button>
        </div>
    );
};
export default RoleList