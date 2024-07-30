// src/User/UserBookList.js
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBooks from '../Book/SearchBooks';

const UserBookList = ({ booksList, onUserLibraryUpdated }) => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const {role} = useParams();

    const handleSearchResults = (searchResults) => {
        setBooks(searchResults);
    };

    const handleAddBook = (bookId) => {
        const addedBook = {
            userId:id,
            bookId:bookId
        };

        axios.put(`https://bookstoreclean.liara.run/api/Library/AddBookToLibrary`, addedBook)
            .then(response => {
                console.log('User library updated!', response.data);
                onUserLibraryUpdated(response.data);
                if (role.includes("Admin")){
                    navigate(`https://bookstorefront.liara.run/bookstore/${role}/users/edit/${id}`);
                }
                else {

                    navigate(`https://bookstorefront.liara.run/bookstore/${role}/users/${id}/detail/${id}`);
                }
            })
            .catch(error => {
                console.error('There was an error updating the user library!', error);
            });
    };

    return (
        <div>
            <h2>Book List</h2>
            <h3>Add book to the user with ID ({id}) by clicking Add in the List.</h3>
            <SearchBooks onSearchResults={handleSearchResults} />
            <table>
                <thead>
                <tr>
                    <th>Actions</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>
                            <button onClick={() => handleAddBook(book.id)}>Add</button>
                        </td>
                        <td>{book.id}</td>
                        <td><Link to={`https://bookstorefront.liara.run/bookstore/${role}/books/detail/${book.id}`}>{book.title}</Link></td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${role}/${id}`)}>Back to Main</button>
        </div>
    );
};

export default UserBookList;
