import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Header = ({ toggleSidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="hamburger-menu" onClick={toggleSidebar}>
                    <i className="fa fa-bars"></i>
                </button>
                <Link to="/dashboard/home" className="header-logo-container">
                    <img className="header-logo" alt="YouTube Logo" src={require('../assets/youtubelogo.png')} />
                    <span className="header-title">YouTube</span>
                </Link>
            </div>
            <div className="header-right">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        <i className="fa fa-search"></i>
                    </button>
                </form>
            </div>
        </header>
    );
};

export default Header;