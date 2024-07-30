// src/DetailUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';

const DetailUser = () => {
    const { id } = useParams();
    const {role} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const {userId} = useParams();

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/users/GetUserById/${id}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user!', error);
            });
    }, [id]);
    
    if (role.includes("Admin")){
       

        if (!user){
            return <div> Loading .... </div>;
        }

        return (
            <div>
                <h2>{user.firstName} {user.lastName}</h2>
                <div>
                    <strong>ID:</strong> {user.id}
                </div>
                <div>
                    <strong>First Name:</strong> {user.firstName}
                </div>
                <div>
                    <strong>Last Name:</strong> {user.lastName}
                </div>
                <div>
                    <strong>Username:</strong> {user.username}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
                <div>
                    <strong>Phone Number:</strong> {user.phoneNumber}
                </div>
                <div>
                    <strong>Password Hash:</strong> {user.passwordHash}
                </div>
                <div>
                    <h2>Books of {user.firstName} {user.lastName}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {user.books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${role}/users`)}>Back to list</button>
            </div>
        );
    }
    else {

        if (!user){
            return <div> Loading .... </div>;
        }

        return (
            <div>
                <h2>{user.firstName} {user.lastName}</h2>
                <div>
                    <strong>ID:</strong> {user.id}
                </div>
                <div>
                    <strong>First Name:</strong> {user.firstName}
                </div>
                <div>
                    <strong>Last Name:</strong> {user.lastName}
                </div>
                <div>
                    <strong>Username:</strong> {user.username}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
                <div>
                    <strong>Phone Number:</strong> {user.phoneNumber}
                </div>
                <div>
                    <strong>Password Hash:</strong> {user.passwordHash}
                </div>
                <div>
                    <h2>Books of {user.firstName} {user.lastName}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {user.books.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td><Link
                                    to={`https://bookstorefront.liara.run/bookstore/${role}/users/library/remove?BOOK_ID=${book.id}&USER_ID=${id}`}>Remove
                                    From the Library</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${role}/${userId}`)}>Back To Main</button>
                <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${role}/users/addUserBook/${id}`)}>Add Books</button>
            </div>
        );
    }

};

export default DetailUser;
