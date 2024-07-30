// src/Role/RoleList
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';


const RoleList =  ({roles}) => {
    const navigate = useNavigate();
    const {rolePara} = useParams();
    const {userId} = useParams();
    
    return (
        <div>
            <h2>Role List</h2>
            <Link to={`https://bookstorefront.liara.run/bookstore/${rolePara}/${userId}/roles/add`}>Add New Role</Link>
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
                        <td><Link to={`https://bookstorefront.liara.run/bookstore/${rolePara}/${userId}/roles/detail/${role.id}`}>{role.id}</Link></td>
                        <td>{role.name}</td>
                        <td>
                            <Link to={`https://bookstorefront.liara.run/bookstore/${rolePara}/${userId}/roles/edit/${role.id}`}>Edit</Link>
                            <br/>
                            <Link to={`https://bookstorefront.liara.run/bookstore/${rolePara}/${userId}/roles/delete/${role.id}`}>Delete</Link>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${rolePara}/${userId}`)}>Back to Main</button>
        </div>
    );
};
export default RoleList