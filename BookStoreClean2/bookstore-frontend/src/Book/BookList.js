// src/BookList.js
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBooks from "./SearchBooks";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
const BookList = ({booksList}) => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    // useEffect(() => {
    //     fetchBooks();
    // }, []);
    // const fetchBooks = () => {
    //     axios.get('https://localhost:7051/api/books/AllBooks')
    //         .then(response => {
    //             console.log('Books fetched:', response.data);
    //             setBooks(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the books!', error);
    //         });
    // };
    const handleSearchResults = (searchResults) => {
        setBooks(searchResults);
    }
    return (
        <div>
            <h2>Book List</h2>
            <Link to={`/bookstore/books/add`}>Add New Book</Link>
            <SearchBooks onSearchResults={handleSearchResults}/>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {booksList.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td><Link to={`/bookstore/books/detail/${book.id}`}>{book.title}</Link></td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        <td>
                            <Link to={`/bookstore/books/edit/${book.id}`}>Edit</Link>
                            <Link to={`/bookstore/books/delete/${book.id}`}>Delete</Link>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/bookstore')}>Back to Main</button>
        </div>
    );
};

export default BookList;
