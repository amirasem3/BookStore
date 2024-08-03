// src/AddBook.js
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const {role} = useParams();
    const {userId} = useParams()
    const token = localStorage.getItem('token');
    const books = JSON.parse(localStorage.getItem('books'));
    const [myBooks, setBooks] = useState([]);
    
    // const handleBookAdded = (newBook) => {
    //     setBooks(prevBooks => [...prevBooks, newBook]);
    // };
    const handleSubmit = (event) => {
        event.preventDefault();

        const newBook = {
            title,
            author,
            price: parseFloat(price)
        };

        axios.post('https://bookstoreclean.liara.run/api/books/AddBook', newBook,{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response => {
                console.log('Book added!', response.data);
                // handleBookAdded(response.data);  // Call the callback with the new book
                setTitle('');
                setAuthor('');
                setPrice('');
                navigate(`/${role}/${userId}/books`);
            })
            .catch(error => {
                console.error('There was an error adding the book!', error);
            });
    };

    return (
        <div>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>
                <div>
                    <label>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required/>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                </div>
                <button type="submit">Add Book</button>
                <button onClick={() => navigate(`/${role}/${userId}/books`)}>Cancel</button>
            </form>
        </div>
    );
};

export default AddBook;
