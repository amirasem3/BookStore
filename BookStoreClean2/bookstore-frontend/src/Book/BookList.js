// src/BookList.js
import React from 'react';
import { Link } from 'react-router-dom';
const BookList = ({ books }) => {
    
    return (
        <div>
            <h2>Book List</h2>
            <Link to={`/bookstore/add`}>Add New Book</Link>
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
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td> <Link to={`/bookstore/detail/${book.id}`}>{book.title}</Link></td>
                        <td>{book.author}</td>
                        <td>{book.price}</td>
                        <td>
                            <Link to={`/bookstore/edit/${book.id}`}>Edit</Link>
                            <Link to={`/bookstore/delete/${book.id}`}>Delete</Link>
                           
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
