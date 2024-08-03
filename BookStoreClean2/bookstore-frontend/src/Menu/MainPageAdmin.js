// src/Menu/MainPageAdmin.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import BookList from '../Book/BookList';
import UserList from '../User/UserList';
import RoleList from '../Role/RoleList';
import AddBook from '../Book/AddBook';
import EditBook from '../Book/EditBook';
import DeleteBook from '../Book/DeleteBook';
import DetailBook from '../Book/DetailBook';
import AddUser from '../User/AddUser';
import EditUser from '../User/EditUser';
import DeleteUser from '../User/DeleteUser';
import DetailUser from '../User/DetailUser';
import UserBookList from '../User/UserBookList';
import EditUserLibrary from '../User/EditUserLibrary';
import AddRole from '../Role/AddRole';
import DeleteRole from '../Role/DeleteRole';
import RoleDetail from '../Role/RoleDetail';
import RoleEdit from '../Role/RoleEdit';

const MainPageAdmin = () => {
    const { role, userId } = useParams(); // Combined destructuring
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchBooks();
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('https://bookstoreclean.liara.run/api/books/AllBooks', {
                headers: { Authorization: 'Bearer ' + token },
            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://bookstoreclean.liara.run/api/users/AllUsers', {
                headers: { Authorization: 'Bearer ' + token },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('https://bookstoreclean.liara.run/api/Role/GetAllRoles', {
                headers: { Authorization: 'Bearer ' + token },
            });
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleBookAdded = (newBook) => {
        setBooks((prevBooks) => [...prevBooks, newBook]);
    };

    const handleUserAdded = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleRoleAdded = (newRole) => {
        setRoles((prevRoles) => [...prevRoles, newRole]);
    };

    const handleBookUpdated = (updatedBook) => {
        setBooks((prevBooks) => prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
    };

    const handleUserUpdated = (updatedUser) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    };

    const handleRoleUpdated = (updatedRole) => {
        setRoles((prevRoles) => prevRoles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
    };

    const handleBookDeleted = (deletedBookId) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletedBookId));
    };

    const handleUserDeleted = (deletedUserId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletedUserId));
    };

    const handleRoleDeleted = (deletedRoleId) => {
        setRoles((prevRoles) => prevRoles.filter((role) => role.id !== deletedRoleId));
    };

    // if (!role || !role.includes("Admin")) {
    //     return <Navigate to="/bookstore" />;
    // }
    
    if(role.includes("Admin")){
        return (
            <div>
                <h1>Bookstore</h1>
                <h1>Welcome to Book Store</h1>
                <strong>ROLE:</strong> {role}
                <br />
                <Link to={`/${role}/${userId}/books`}>Books</Link>
                <br />
                <Link to={`/${role}/${userId}/users`}>Users</Link>
                <br />
                <Link to={`/${role}/${userId}/roles`}>Roles</Link>
                <br />
                <button onClick={() => navigate(`/bookstore`)}>Logout</button>
                <Routes>
                    {/*<Route path="/:role/:userId/books" element={<BookList booksList={books} />} />*/}
                    <Route path="/users" element={<UserList users={users} />} />
                    <Route path="/roles" element={<RoleList roles={roles} />} />
                    <Route path="/books/add" element={<AddBook onBookAdded={handleBookAdded} />} />
                    <Route path="/books/edit/:id" element={<EditBook onBookUpdated={handleBookUpdated} />} />
                    <Route path="/books/delete/:id" element={<DeleteBook onBookDeleted={handleBookDeleted} />} />
                    <Route path="/books/detail/:id" element={<DetailBook />} />
                    <Route path="/users/add" element={<AddUser onUserAdded={handleUserAdded} roles={roles} />} />
                    <Route path="/users/edit/:id" element={<EditUser onUserUpdated={handleUserUpdated} />} />
                    <Route path="/users/delete/:id" element={<DeleteUser onUserDeleted={handleUserDeleted} />} />
                    <Route path="/users/:userId/detail/:id" element={<DetailUser />} />
                    <Route path="/users/addUserBook/:id" element={<UserBookList booksList={books} onUserLibraryUpdated={handleUserUpdated} />} />
                    <Route path="/users/library/remove" element={<EditUserLibrary />} />
                    <Route path="/roles/add" element={<AddRole onRoleAdded={handleRoleAdded} />} />
                    <Route path="/roles/delete/:id" element={<DeleteRole onRoleDeleted={handleRoleDeleted} />} />
                    <Route path="/roles/detail/:id" element={<RoleDetail />} />
                    <Route path="/roles/edit/:id" element={<RoleEdit onRoleUpdated={handleRoleUpdated} />} />
                </Routes>
            </div>
        );
    }
    
    else {
        return (
            <div>
                <h1>Welcome to Book Store</h1>
                <strong>ROLE:</strong> {role}
                <br/>
                <Link to={`/${role}/${userId}/books`}>Books</Link>
                <br/>

                <Link to={`/${role}/users/${userId}/detail/${userId}`}>Profile</Link>
                <br/>
                <button onClick={() => navigate(`/bookstore`)}>Logout</button>
                <Routes>
                    {/*<Route path="/:role/:userId/books" element={<BookList booksList={books} />} />*/}
                    <Route path="/users" element={<UserList users={users}/>}/>
                    <Route path="/roles" element={<RoleList roles={roles}/>}/>
                    <Route path="/books/add" element={<AddBook onBookAdded={handleBookAdded}/>}/>
                    <Route path="/books/edit/:id" element={<EditBook onBookUpdated={handleBookUpdated}/>}/>
                    <Route path="/books/delete/:id" element={<DeleteBook onBookDeleted={handleBookDeleted}/>}/>
                    <Route path="/books/detail/:id" element={<DetailBook/>}/>
                    <Route path="/users/add" element={<AddUser onUserAdded={handleUserAdded} roles={roles}/>}/>
                    <Route path="/users/edit/:id" element={<EditUser onUserUpdated={handleUserUpdated}/>}/>
                    <Route path="/users/delete/:id" element={<DeleteUser onUserDeleted={handleUserDeleted}/>}/>
                    <Route path="/users/:userId/detail/:id" element={<DetailUser/>}/>
                    <Route path="/users/addUserBook/:id" element={<UserBookList booksList={books} onUserLibraryUpdated={handleUserUpdated}/>}/>
                    <Route path="/users/library/remove" element={<EditUserLibrary/>}/>
                    <Route path="/roles/add" element={<AddRole onRoleAdded={handleRoleAdded}/>}/>
                    <Route path="/roles/delete/:id" element={<DeleteRole onRoleDeleted={handleRoleDeleted}/>}/>
                    <Route path="/roles/detail/:id" element={<RoleDetail/>}/>
                    <Route path="/roles/edit/:id" element={<RoleEdit onRoleUpdated={handleRoleUpdated}/>}/>
                </Routes>
            </div>
        );
    }


};

export default MainPageAdmin;
