// src/Menu/MainPageUser

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route, Routes, useParams} from 'react-router-dom';

const MainPageUser = () => {
    const { role } = useParams(); 
    return (

        <div>
            <h1>Welcome to Book Store</h1>
            
            <strong>ROLE:</strong> {role}
            <br/>

            <Link to={`/bookstore/books`}>Books</Link>
            <br/>
            <Link to={`/bookstore/users`}>Users</Link>
        </div>

    );
};
export default MainPageUser;