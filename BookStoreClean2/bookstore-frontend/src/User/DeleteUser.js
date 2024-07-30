// srd/User/DeleteUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteUser = ({onUserDeleted}) => {
    const { id } = useParams();
    const {role} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/users/GetUserById/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the User!', error);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://bookstoreclean.liara.run/api/users/RemoveUser?id=${id}`)
            .then(() => {
                console.log('Book deleted!');
                onUserDeleted(id);
                navigate(`/bookstore/${role}/${id}/users`);
            })
            .catch(error => {
                console.error('There was an error deleting the User!', error);
            });
    };
    if (!user){
        return <div> Loading .... </div>;
    }

    return (
        <div>
            <h2>Remove User</h2>
            <p>Are you sure you want to delete the following User?</p>

            <div>
                <strong>First Name:</strong> {user.firstName}
            </div>
            <div>
                <strong>Last Name:</strong> {user.lastName}
            </div>
            <div>
                <strong>Username</strong> {user.username}
            </div>
            <div>
                <strong>Email</strong> {user.email}
            </div>
            <div>
                <strong>Phone Number</strong> {user.phoneNumber}
            </div>
            <button onClick={() => handleDelete()}>Yes</button>
            <button onClick={() => navigate(`/bookstore/${role}/users`)}>No</button>
        </div>
    );
};

export default DeleteUser;
