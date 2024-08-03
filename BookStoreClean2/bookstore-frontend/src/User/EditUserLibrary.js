import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const EditUserLibrary = () => {
    const location = useLocation();
    const { id } = useParams();
    const {role} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const params = new URLSearchParams(location.search);
    const bookId = params.get('BOOK_ID');
    const userId = params.get('USER_ID');
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://bookstoreclean.liara.run/api/books/GetBookById/${bookId}`,{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
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

       
        axios.delete(`https://bookstoreclean.liara.run/api/Library/RemoveBookFromLibrary?UserId=${userId}&BookId=${bookId}`,{
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(() => {
                console.log('Book deleted!');
                if (role.includes("Admin")){

                    navigate(`/${role}/users/edit/${userId}`);
                }
                else {
                    navigate(`/${role}/users/${userId}/detail/${userId}`)
                }
            })
            .catch(error => {
                console.error('There was an error deleting the User!', error);
            });
    };
    if (!user){
        return <div> Loading .... </div>;
    }
    
    if (role.includes("Admin")){
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
                <button onClick={() => navigate(`/${role}/users/edit/${userId}`)}>No</button>
            </div>
        );
    }
    else {
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
                <button onClick={() => navigate(`/${role}/users/${userId}/detail/${userId}`)}>No</button>
            </div>
        );
    }
   
};

export default EditUserLibrary;
