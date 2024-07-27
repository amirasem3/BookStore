import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const EditUserLibrary = ({onUserDeleted}) => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const params = new URLSearchParams(location.search);
    const bookId = params.get('BOOK_ID');
    const userId = params.get('USER_ID');

    useEffect(() => {
        axios.get(`https://localhost:7051/api/books/GetBookById/${bookId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the User!', error);
            });
    }, [id]);

    const handleDelete = () => {
        // event.preventDefault();
        const deletePayload = {
            userId: userId,
            bookId:bookId
        };

       
        axios.delete(`https://localhost:7051/api/Library/RemoveBookFromLibrary?UserId=${userId}&BookId=${bookId}`)
            .then(() => {
                console.log('Book deleted!');
                navigate('/bookstore/users');
            })
            .catch(error => {
                console.error('There was an error deleting the User!', error);
            });
    };
    if (!user){
        return <div> Loading .... </div>;
    }

    return (
        <div>
            <h2>Remove Book</h2>
            <p>Are you sure you want to delete the following book from the library?</p>

            <div>
                <strong>Title:</strong> {user.title}
            </div>
            <div>
                <strong>Author:</strong> {user.author}
            </div>
            <div>
                <strong>Price : </strong> {user.price}
            </div>
           
            <button onClick={() => handleDelete()}>Yes</button>
            <button onClick={() => navigate('/bookstore/users')}>No</button>
        </div>
    );
};

export default EditUserLibrary;
