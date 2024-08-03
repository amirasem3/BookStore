import React from 'react';
import './Header.css';

const Header = () => {
    
    const user  = JSON.parse(localStorage.getItem('user'));
    let roleName = "";
    if (user!==null){
        roleName = user.roleName + "Panel";
    }
    else{
        roleName = ""
    }
    return (
        <header className="header">
            <div className="logo">Bookstore {roleName}</div>
            <nav>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#collections">Collections</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            <button className="cta">Shop Now</button>
        </header>
    );
};

export default Header;
