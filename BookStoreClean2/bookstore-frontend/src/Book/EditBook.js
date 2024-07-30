// src/EditBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = ({ onBookUpdated }) => {
    const { id } = useParams();
    const {role} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(null);
    const {userId} = useParams();
    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/books/GetBookById/${id}`)
            .then(response => {
                const book = response.data;
                setTitle(book.title);
                setAuthor(book.author);
                setPrice(book.price);
            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
                setError('Error fetching book data.');
                
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedBook = {
            id,
            title,
            author,
            price: parseFloat(price)
        };

        axios.put(`https://bookstoreclean.liara.run/api/books/UpdateBook/${id}`, updatedBook)
            .then(response => {
                console.log('Book updated!', response.data);
                onBookUpdated(response.data);
                navigate(`https://bookstorefront.liara.run/bookstore/${role}/${userId}/books`);
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });
        
    };

    return (
        <div>
            <h2>Edit Book</h2>
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
                <button type="submit">Update Book</button>
                <button onClick={() => navigate(`https://bookstorefront.liara.run/bookstore/${role}/${userId}/books`)}>Cancel</button>
            </form>
        </div>
    );
};

export default EditBook;
