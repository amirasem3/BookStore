// src/DeleteBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBook = ({onBookDeleted}) => {
    const { id } = useParams();
    const {role} = useParams();
    const {userId} = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const token = localStorage.getItem('token');
    const [myBooks, setBooks] = useState([]);

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


    // const handleBookDeleted = (deletedBookId) => {
    //     setBooks(prevBooks => prevBooks.filter(book => book.id !== deletedBookId));
    // };
    const handleDelete = () => {
        axios.delete(`https://bookstoreclean.liara.run/api/books/DeleteBook/${id}`, {
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(() => {
                console.log('Book deleted!');
                // handleBookDeleted(id);
                navigate(`/${role}/${userId}/books`);
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
                <button onClick={()=> navigate(`/${role}/${userId}/books`)}>No</button>
        </div>
    );
};

export default DeleteBook;
