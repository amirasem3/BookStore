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
import Header from "./Component/Header";

const App = () => {
   
    // const [users, setUsers] = useState([]);
    // const [roles, setRoles]  = useState([]);
    //
    // useEffect(() => {
    //     fetchBooks();
    // }, []);
    //
    // useEffect(() => {
    //     fetchUsers();
    // }, []);
    //
    // useEffect(() => {
    //     fetchRoles();
    // }, []);
    // const fetchBooks = () => {
    //     axios.get('https://bookstoreclean.liara.run/api/books/AllBooks')
    //         .then(response => {
    //             console.log('Books fetched:', response.data);
    //             setBooks(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the books!', error);
    //         });
    // };
    // const fetchUsers = () => {
    //     axios.get('https://bookstoreclean.liara.run/api/users/AllUsers')
    //         .then(response => {
    //             console.log('Users fetched:', response.data);
    //             setUsers(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the books!', error);
    //         });
    // };
    //
    // const fetchRoles = () =>{
    //     axios.get('https://bookstoreclean.liara.run/api/Role/GetAllRoles')
    //         .then(response =>{
    //             console.log('Roles Fetched:', response.data);
    //             setRoles(response.data);
    //         })
    //         .catch(error =>{
    //             console.error('There was an error in fetching the Roles!', error);
    //         })
    // }
    //
    // const handleBookAdded = (newBook) => {
    //     setBooks(prevBooks => [...prevBooks, newBook]);
    // };
    //
    // const handleUserAdded = (newUser) => {
    //     setUsers(prevUsers => [...prevUsers, newUser]);
    // }
    //
    // const handleRoleAdded = (newRole) => {
    //     setRoles(prevRoles => [...prevRoles, newRole]);
    // }
    // const handleBookUpdated = (updatedBook) => {
    //     setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
    // };
    // const handleUserUpdated = (updatedUser) => {
    //     setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    // }
    // const handleRoleUpdated = (updatedRole) => {
    //     setRoles(prevRoles => prevRoles.map(role => role.id === updatedRole.id ? updatedRole:role));
    // }
    // const handleBookDeleted = (deletedBookId) => {
    //     setBooks(prevBooks => prevBooks.filter(book => book.id !== deletedBookId));
    // };
    //
    // const handleUserDeleted = (deletedUserId) => {
    //     setUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
    // }
    //
    // const handleRoleDeleted = (deletedRoleId) =>{
    //     setRoles(prevRoles => prevRoles.filter(role => role.id !== deletedRoleId));
    // }
    // const handleSearchResults = (searchResults) => {
    //     setBooks(searchResults);
    // }


    return (
        <Router>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/bookstore" />} />
                    <Route path="/bookstore" element={<LoginUser />} />
                    <Route path="/bookstore/:role/:userId/*" element={<MainPageAdmin />} />
                    <Route path="/:role/:userId/books" element={<BookList />} />
                    <Route path="/:role/:userId/users" element={<UserList/>}/>
                    <Route path="/:rolePara/:userId/roles" element={<RoleList/>}/>
                    <Route path="/:role/:userId/books/add" element={<AddBook/>}/>
                    <Route path="/:role/:userId/books/edit/:id" element={<EditBook />}/>
                    <Route path="/:role/:userId/books/delete/:id" element={<DeleteBook/>}/>
                    <Route path="/:role/:userId/books/detail/:id" element={<DetailBook/>}/>
                    <Route path="/:role/users/add" element={<AddUser/>}/>
                    <Route path="/:role/users/edit/:id" element={<EditUser/>}/>
                    <Route path="/:role/users/delete/:id" element={<DeleteUser />}/>
                    <Route path="/:role/users/:userId/detail/:id" element={<DetailUser/>}/>
                    <Route path="/:role/users/addUserBook/:id" element={<UserBookList />}/>
                    <Route path="/:role/users/library/remove" element={<EditUserLibrary/>}/>
                    <Route path="/:rolePara/:userId/roles/add" element={<AddRole/>}/>
                    <Route path="/:rolePara/:userId/roles/delete/:id" element={<DeleteRole />}/>
                    <Route path="/:rolePara/:userId/roles/detail/:id" element={<RoleDetail/>}/>
                    <Route path="/:rolePara/:userId/roles/edit/:id" element={<RoleEdit />}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
