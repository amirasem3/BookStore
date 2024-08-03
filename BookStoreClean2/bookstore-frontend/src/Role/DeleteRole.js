// srd/Role/DeleteRole.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteRole = () => {
    const { id } = useParams();
    const {rolePara} = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const {userId} = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/Role/GetRoleById?id=${id}`,{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response => {
                setRole(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the User!', error);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://bookstoreclean.liara.run/api/Role/DeleteRole?roleId=${id}`, {
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(() => {
                console.log('Role deleted!');
                navigate(`/${rolePara}/${userId}/roles`);
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
            <button onClick={() => navigate(`/${rolePara}/${userId}/roles`)}>No</button>
        </div>
    );
};

export default DeleteRole;
