// src/Role/RoleDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RoleDetail = () => {
    const { id } = useParams();
    const {rolePara} = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const {userId}  = useParams();
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/Role/GetRoleById?id=${id}`, {
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response => {
                setRole(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the role!', error);
            });
    }, [id]);

    if (!role){
        return <div> Loading Role .... </div>;
    }

    return (
        <div>
            <h2>{role.name}</h2>
            <div>
                <strong>ID:</strong> {role.id}
            </div>
            

            <button onClick={() => navigate(`/${rolePara}/${userId}/roles`)}>Back to list</button>
        </div>
    );
};

export default RoleDetail;
