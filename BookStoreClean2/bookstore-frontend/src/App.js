// src/App.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import MainPage from "./Menu/MainPage";
import UserBookList from "./User/UserBookList";

const App = () => {
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchBooks = () => {
        axios.get('https://localhost:7051/api/books/AllBooks')
            .then(response => {
                console.log('Books fetched:', response.data);
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    };
    const fetchUsers = () => {
        axios.get('https://localhost:7051/api/users/AllUsers')
            .then(response => {
                console.log('Users fetched:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books!', error);
            });
    };

    const handleBookAdded = (newBook) => {
        setBooks(prevBooks => [...prevBooks, newBook]);
    };

    const handleUserAdded = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
    }
    const handleBookUpdated = (updatedBook) => {
        setBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
    };
    const handleUserUpdated = (updatedUser) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    }
    const handleBookDeleted = (deletedBookId) => {
        setBooks(prevBooks => prevBooks.filter(book => book.id !== deletedBookId));
    };
    
    const handleUserDeleted = (deletedUserId) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
    }
    // const handleSearchResults = (searchResults) => {
    //     setBooks(searchResults);
    // }


    return (
        <Router>
            <div>
                <h1>Bookstore</h1>
                <Routes>
                    <Route path="/" element={<LoginUser/>}/>
                    <Route path="/bookstore" element={<MainPage/>}/>
                    <Route path="/bookstore/books" element={<BookList booksList={books}/>}/>
                    <Route path="/bookstore/users" element={<UserList users={users}/> }/>
                    <Route path="/bookstore/books/add" element={<AddBook onBookAdded={handleBookAdded}/>}/>
                    <Route path="/bookstore/books/edit/:id" element={<EditBook onBookUpdated={handleBookUpdated}/>}/>
                    <Route path="/bookstore/books/delete/:id" element={<DeleteBook onBookDeleted={handleBookDeleted}/>}/>
                    <Route path="/bookstore/books/detail/:id" element={<DetailBook/>}/>
                    <Route path="/bookstore/users/add" element={<AddUser onUserAdded={handleUserAdded}/>}/>
                    <Route path="/bookstore/users/edit/:id" element={<EditUser onUserUpdated={handleUserUpdated}/>}/>
                    <Route path="/bookstore/users/delete/:id" element={<DeleteUser onUserDeleted={handleUserDeleted}/>}/>
                    <Route path="/bookstore/users/detail/:id" element={<DetailUser/>}/>
                    <Route path="/bookstore/users/addUserBook/:id" element={<UserBookList booksList={books} onUserLibraryUpdated={handleUserUpdated}/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
