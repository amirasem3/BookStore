// src/Menu/MainPage

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';

const MainPage = () => {
    return (

        <div>
            <h1>Welcome to Book Store</h1>

            <Link to={`/bookstore/books`}>Books</Link>
            <Link to={`/bookstore/users`}>Users</Link>
        </div>

    );
};
export default MainPage;