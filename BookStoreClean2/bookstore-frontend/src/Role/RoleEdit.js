// src/ Role/RoleEdit.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';

const RoleEdit = ({onRoleUpdated}) => {
    const {id} = useParams();
    const {rolePara} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const {userId}  = useParams();

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/Role/GetRoleById?id=${id}`)
            .then(response => {
                const role = response.data;
                setName(role.name);
            })
            .catch(error => {
                console.error('There was an error fetching the role!', error);
                setError('Error fetching book data.');

            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedRole = {
            id,
            name
        };

        axios.put(`https://bookstoreclean.liara.run/api/Role/UpdateRole`, updatedRole)
            .then(response => {
                console.log('Book updated!', response.data);
                onRoleUpdated(response.data);



                navigate(`https://bookstorefront.liara.run/bookstore/${rolePara}/${userId}/roles`);

            })
            .catch(error => {
                console.error('There was an error updating the role!', error);
            });

    };
    console.log(`User Come to this page is ${rolePara}`);

    return (
        <div>
            <h2>Edit Role</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <button type="submit">Update Role</button>
                <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${rolePara}/${userId}/roles`)}>Cancel</button>
            </form>
        </div>
    );
};

export default RoleEdit;
