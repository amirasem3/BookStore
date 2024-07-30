// src/App.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import BookList from './Book/BookList';
import AddBook from './Book/AddBook';
import EditBook from './Book/EditBook';
import DeleteBook from './Book/DeleteBook';
import DetailBook from "./Book/DetailBook";
// import SearchBooks from "./Book/SearchBooks";
import UserList from "./User/UserList";
import AddUser from "./User/AddUser";
import LoginUser from "./User/LoginUser";
import EditUser from "./User/EditUser";
import DeleteUser from "./User/DeleteUser";
import DetailUser  from "./User/DetailUser";
import MainPageAdmin from "./Menu/MainPageAdmin";
import UserBookList from "./User/UserBookList";
import EditUserLibrary from "./User/EditUserLibrary";
import RoleList from "./Role/RoleList";
import AddRole from "./Role/AddRole";
import DeleteRole from "./Role/DeleteRole";
import RoleDetail from "./Role/RoleDetail";
import RoleEdit from "./Role/RoleEdit";
import {useNavigate, useParams} from "react-router-dom";import MainPageUser from "./Menu/MainPageUser";

const App = () => {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [roles, setRoles]  = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchRoles();
    }, []);
    const fetchBooks = () => {
        axios.get('https://bookstoreclean.liara.run/api/books/AllBooks')
            .then(response => {
                console.log('Books fetched:', response.data);
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    };
    const fetchUsers = () => {
        axios.get('https://bookstoreclean.liara.run/api/users/AllUsers')
            .then(response => {
                console.log('Users fetched:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    };
    
    const fetchRoles = () =>{
        axios.get('https://bookstoreclean.liara.run/api/Role/GetAllRoles')
            .then(response =>{
                console.log('Roles Fetched:', response.data);
                setRoles(response.data);
            })
            .catch(error =>{
                console.error('There was an error in fetching the Roles!', error);
            })
    }

    const handleBookAdded = (newBook) => {
        setBooks(prevBooks => [...prevBooks, newBook]);
    };

    const handleUserAdded = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
    }
    
    const handleRoleAdded = (newRole) => {
        setRoles(prevRoles => [...prevRoles, newRole]);
    }
    const handleBookUpdated = (updatedBook) => {
        setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
    };
    const handleUserUpdated = (updatedUser) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    }
    const handleRoleUpdated = (updatedRole) => {
        setRoles(prevRoles => prevRoles.map(role => role.id === updatedRole.id ? updatedRole:role));
    }
    const handleBookDeleted = (deletedBookId) => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== deletedBookId));
    };
    
    const handleUserDeleted = (deletedUserId) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
    }
    
    const handleRoleDeleted = (deletedRoleId) =>{
        setRoles(prevRoles => prevRoles.filter(role => role.id !== deletedRoleId));
    }
    // const handleSearchResults = (searchResults) => {
    //     setBooks(searchResults);
    // }


    return (
        <Router>
            <div>
                <h1>Bookstore</h1>
                <Routes basename="/bookstore">
                    <Route path="/" element={<Navigate to="/bookstore" />} />
                    <Route path="/bookstore" element={<LoginUser/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/:userId" element={<MainPageAdmin/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/:userId/books" element={<BookList booksList={books}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/:userId/users" element={<UserList users={users}/> }/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:rolePara/:userId/roles" element={<RoleList roles={roles}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/:userId/books/add" element={<AddBook onBookAdded={handleBookAdded}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/:userId/books/edit/:id" element={<EditBook onBookUpdated={handleBookUpdated}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/:userId/books/delete/:id" element={<DeleteBook onBookDeleted={handleBookDeleted}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/:userId/books/detail/:id" element={<DetailBook/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/users/add" element={<AddUser onUserAdded={handleUserAdded} roles={roles}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/users/edit/:id" element={<EditUser onUserUpdated={handleUserUpdated}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/users/delete/:id" element={<DeleteUser onUserDeleted={handleUserDeleted}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/users/:userId/detail/:id" element={<DetailUser/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/users/addUserBook/:id" element={<UserBookList booksList={books} onUserLibraryUpdated={handleUserUpdated}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:role/users/library/remove" element={<EditUserLibrary/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:rolePara/:userId/roles/add" element={<AddRole onRoleAdded={handleRoleAdded}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:rolePara/:userId/roles/delete/:id" element={<DeleteRole onRoleDeleted={handleRoleDeleted}/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:rolePara/:userId/roles/detail/:id" element={<RoleDetail/>}/>
                    <Route path="https://bookstorefront.liara.run/bookstore/:rolePara/:userId/roles/edit/:id" element={<RoleEdit onRoleUpdated={handleRoleUpdated}/>}/>
                        
                </Routes>
            </div>
        </Router>
    );
};

export default App;
