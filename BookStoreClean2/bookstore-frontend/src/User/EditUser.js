// src/User/EditUser.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';

const EditUser = ({onUserUpdated}) => {
    const {id} = useParams();
    const {role} = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [roleName, setRoleName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/users/GetUserById/${id}`)
            .then(response => {
                const user = response.data;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setUsername(user.username);
                setPhoneNumber(user.phoneNumber);
                setRoleName(user.roleName)
                setUserBooks(user.books);


            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
                setError('Error fetching book data.');

            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedUser = {
            id,
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            roleName

        };

        axios.put(`https://bookstoreclean.liara.run/api/users/UpdateUser`, updatedUser)
            .then(response => {
                console.log('user updated!', response.data);
                onUserUpdated(response.data);
                navigate(`/bookstore/${role}/${id}/users`);
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });

    };

    return (
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                </div>
                
                <div>
                    <label>Role</label>
                    <input type="text" value={roleName} onChange={(e => setRoleName(e.target.value))} required/>
                </div>
                <div>
                    <h2>{firstName} {lastName}'s Library</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userBooks.map(book => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td><Link to={`/bookstore/${role}/users/library/remove?BOOK_ID=${book.id}&USER_ID=${id}`}>Remove
                                    From the Library</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button onClick={() => navigate(`/bookstore/${roleName}/users/addUserBook/${id}`)}>Add Books</button>
                <button type="submit">Update User</button>
                <button onClick={() => navigate(`/bookstore/${roleName}/users`)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditUser;
