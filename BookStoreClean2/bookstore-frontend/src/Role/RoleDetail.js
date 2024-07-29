// src/Role/RoleDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RoleDetail = () => {
    const { id } = useParams();
    const {rolePara} = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7051/api/Role/GetRoleById?id=${id}`)
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
            

            <button onClick={() => navigate(`/bookstore/${rolePara}/roles`)}>Back to list</button>
        </div>
    );
};

export default RoleDetail;
