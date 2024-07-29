// src/Role/AddRole

import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";


const AddRole = ({onRoleAdded}) => {
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();
    const {role} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`https://localhost:7051/api/Role/CreateRole?roleName=${roleName}`)
            .then(response => {
                console.log('Role added!', response.data);
                onRoleAdded(response.data);  // Call the callback with the new book
               setRoleName('');
                navigate(`/bookstore/${role}/roles`);
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
                <button onClick={() => navigate(`/bookstore/${role}/roles`)}>Cancel</button>
            </form>
        </div>
    );
};
export default AddRole;