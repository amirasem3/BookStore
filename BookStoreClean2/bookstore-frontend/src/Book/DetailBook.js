﻿// src/Book/DetailBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DetailBook = () => {
    const { id } = useParams();
    const {role} = useParams();
    const {userId}  = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const token  = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/books/GetBookById/${id}`,{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
            });
    }, [id]);
    
    if (!book){
        return <div> Loading .... </div>;
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <div>
                <strong>ID:</strong> {book.id}
            </div>
            <div>
                <strong>Title:</strong> {book.title}
            </div>
            <div>
                <strong>Author:</strong> {book.author}
            </div>
            <div>
                <strong>Price:</strong> {book.price}
            </div>
            
            <button onClick={()=> navigate(`/${role}/${userId}/books`)}>Back to list</button>
        </div>
    );
};

export default DetailBook;
