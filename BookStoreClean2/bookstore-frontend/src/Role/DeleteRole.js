// srd/Role/DeleteRole.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteRole = ({onRoleDeleted}) => {
    const { id } = useParams();
    const {rolePara} = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const {userId} = useParams();

    useEffect(() => {
        axios.get(`https://localhost:7051/api/Role/GetRoleById?id=${id}`)
            .then(response => {
                setRole(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the User!', error);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://localhost:7051/api/Role/DeleteRole?roleId=${id}`)
            .then(() => {
                console.log('Role deleted!');
                onRoleDeleted(id);
                navigate(`/bookstore/${rolePara}/${userId}/roles`);
            })
            .catch(error => {
                console.error('There was an error deleting the User!', error);
            });
    };
    if (!role){
        return <div> Loading .... </div>;
    }

    return (
        <div>
            <h2>Remove role</h2>
            <p>Are you sure you want to delete the following Role?</p>

            <div>
                <strong>ID:</strong> {role.id}
            </div>
            <div>
                <strong>Name:</strong> {role.name}
            </div>
        
            <button onClick={() => handleDelete()}>Yes</button>
            <button onClick={() => navigate(`/bookstore/${rolePara}/${userId}/roles`)}>No</button>
        </div>
    );
};

export default DeleteRole;
