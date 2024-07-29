// src/Menu/MainPage

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route, Routes, useNavigate, useParams} from 'react-router-dom';

const MainPageAdmin = () => {
    const { role } = useParams();
    const navigate = useNavigate();
    
    if (role.includes("Admin")){
        return (

            <div>
                <h1>Welcome to Book Store</h1>
                <strong>ROLE:</strong> {role}
                <br/>
                <Link to={`/bookstore/${role}/books`}>Books</Link>
                <br/>
                <Link to={`/bookstore/${role}/users`}>Users</Link>
                <br/>
                <Link to={`/bookstore/${role}/roles`}>Role Management</Link>
                <br/>
                <button onClick={() => navigate(`/bookstore/`)}>Logout</button>
            </div>

        );
    }
    return (

        <div>
            <h1>Welcome to Book Store</h1>
            <strong>ROLE:</strong> {role}
            <br/>
            <Link to={`/bookstore/${role}/books`}>Books</Link>
            <br/>
            <Link to={`/bookstore/${role}/users`}>Users</Link>
            <br/>
            <button onClick={() => navigate(`/bookstore`)}>Logout</button>
        </div>

    );
};
export default MainPageAdmin;