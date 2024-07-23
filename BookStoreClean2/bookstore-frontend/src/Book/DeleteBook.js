// src/DeleteBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBook = ({onBookDeleted}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7051/api/books/GetBookById/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`https://localhost:7051/api/books/DeleteBook/${id}`)
            .then(() => {
                console.log('Book deleted!');
                onBookDeleted(id);
                navigate('/bookstore');
            })
            .catch(error => {
                console.error('There was an error deleting the book!', error);
            });
    };
    if (!book){
        return <div> Loading .... </div>;
    }

    return (
        <div>
            <h2>Delete Book</h2>
            <p>Are you sure you want to delete the following book?</p>
            
                <div>
                    <strong>Title:</strong> {book.title}
                </div>
                <div>
                    <strong>Author:</strong> {book.author}
                </div>
                <div>
                    <strong>Price:</strong> {book.price}
                </div>
                <button onClick={()=> handleDelete()}>Yes</button>
                <button onClick={()=> navigate('/bookstore')}>No</button>
        </div>
    );
};

export default DeleteBook;
