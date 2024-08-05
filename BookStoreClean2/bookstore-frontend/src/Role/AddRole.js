// src/Role/AddRole

import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";


const AddRole = () => {
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();
    const {rolePara} = useParams();
    const {userId} = useParams();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`https://bookstoreclean.liara.run/api/Role/CreateRole?roleName=${roleName}`,"",{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response => {
                console.log('Role added!', response.data);
               setRoleName('');
                navigate(`/${user.roleName}/${user.id}/roles`);
            })
            .catch(error => {
                console.error('There was an error adding the User!', error);
            });
    };

    return (
        <div>
            <h2>Add a New Role</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Role Name</label>
                    <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} required/>
                </div>
            
                <button type="submit">Add Role</button>
                <button onClick={() => navigate(`/${user.roleName}/${user.id}/roles`)}>Cancel</button>
            </form>
        </div>
    );
};
export default AddRole;