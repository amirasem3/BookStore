import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useLocation } from 'react-router-dom';

const SearchBooks = ({ onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const token = localStorage.getItem('token');

    const fetchBooks = useCallback(
        debounce(async (term) => {
            const url = term
                ? `https://bookstoreclean.liara.run/api/books/SearchBooks`
                : `https://bookstoreclean.liara.run/api/books/AllBooks`;

            try {
                const response = await axios.get(url, {
                    params: term ? { searchTerm: term } : {},
                    headers:{
                        Authorization:'Bearer '+ token
                    }
                });
                console.log('Search results:', response.data);
                if (response.data != null) {
                    onSearchResults(response.data);
                }
            } catch (error) {
                console.error('There was an error searching for books!', error);
            }
        }, 300),
        [] // Dependencies array, make sure to memoize correctly
    );

    useEffect(() => {
        fetchBooks(searchTerm);
        // Cleanup the debounced function on unmount
        return () => {
            fetchBooks.cancel();
        };
    }, [searchTerm, fetchBooks]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <h2>Search Books</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Enter a Search Term"
            />
        </div>
    );
};

export default SearchBooks;
