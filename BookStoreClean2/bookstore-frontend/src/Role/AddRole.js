// src/Role/AddRole

import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";


const AddRole = ({onRoleAdded}) => {
    const [roleName, setRoleName] = useState('');
    const navigate = useNavigate();
    const {role} = useParams();
    const {userId} = useParams();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`https://bookstoreclean.liara.run/api/Role/CreateRole?roleName=${roleName}`)
            .then(response => {
                console.log('Role added!', response.data);
                onRoleAdded(response.data);  // Call the callback with the new book
               setRoleName('');
                navigate(`https://bookstorefront.liara.run/bookstore/${role}/${userId}/roles`);
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
                <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${role}/${userId}/roles`)}>Cancel</button>
            </form>
        </div>
    );
};
export default AddRole;